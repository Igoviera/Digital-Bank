import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

import React from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [loading, setLoandig] = useState(false)
    const [balances, setBalace] = useState()
    const [user, setUser] = useState()
    const [loginError, setLoginError] = useState(false)

    async function registerUser(data) {
        setLoandig(true)
        try {
            const user = await api().post('http://localhost:7777/users/cadastrar', data)
            if (user) {
                setLoandig(false)
                toast.success('Cadastro efetuado com sucesso!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                Router.push('/')
            }
            setUserCadastro(user)
        } catch (error) {
            setLoandig(false)
            toast.error(error.response?.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error(error)
        }

    }

    async function me() {
        const { 'nextauth.token': token } = parseCookies() // Recuperando token
        if (!token) return
        const user = await api().get('/auth/me')
        if (user) {
            const dataUser = await api().get(`/users/${user.data.id}`)
            setUser(dataUser)
        }
    }

    if (!user) {
        me()
    }

    async function signIn(data) {
        setLoandig(true)
        try {
            const token = await api().post('/auth/login', data)
            setCookie(undefined, 'nextauth.token', token.data.access_token, {
                maxAge: 60 * 60 * 1 // 1hora
            })
            if (token) {
                setLoandig(false)
                Router.push('/')
            }
        } catch (error) {
            setLoandig(false)
            setLoginError(error.response.data.message)
        }
    }


    const logout = () => {
        setUser(null)
        destroyCookie(null, 'nextauth.token')
        Router.push('/login')
    }

    async function TransferValue(data) {
        try {
            const balance = await api().patch(`/users/tranferir${data.username}`, { "balance": data.balance })
            if (balance) {
                toast.success('Transferência efetuada com sucesso!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setBalace(balance)
            }

        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(error.response.data.message)
        }
    }

    return (
        <AuthContext.Provider value={{
            loading,
            user,
            registerUser,
            signIn,
            loginError,
            logout,
            TransferValue,
            balances
        }}>
            {children}
        </AuthContext.Provider>
    )
}


