import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { BiChevronsLeft } from 'react-icons/bi'
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContesxt";
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";
import { parseCookies } from "nookies";


const schema = yup.object({
    username: yup.string().required('O nome é obrigatorio.'),
    balance: yup.number().required('O valor é obrigatorio.')
}).required();


export default function Transfer() {
    const { user } = useContext(AuthContext)

    const { TransferValue } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies()
        if (!token) {
            Router.push('/login')
        }
    }, [])


    async function onSubmit(data) {
        await TransferValue(data)
    }

    return (
        <Box maxW={500} marginTop={18} marginLeft={3} marginRight={3}>
            <Flex justifyContent={'space-between'} >
                <Heading cursor={'pointer'} as='h2' size='xl'>
                    <Link href='/'>
                        <BiChevronsLeft />
                    </Link>
                </Heading>
                <Heading as='h2' size='ms' color={'#03B42A'}>
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                        .format(user?.data.accounts?.balance)}
                </Heading>
            </Flex>
            <Heading textAlign={'center'} marginTop={10} as='h1' size='xl'>Transfêrencia</Heading>
            <Heading marginTop={20} as='h2' size='md'>Nome:</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    placeholder='nome'
                    maxLength={36}
                    name="username"
                    marginTop={3}
                    display={'flex'}
                    flexDirection='column'
                    {...register("username", { required: true })}
                />
                <span style={{ color: 'red', position: "absolute", marginTop: '0px' }}>{errors.username?.message}</span>
                <Box marginTop={10} marginBottom={20}>
                    <Heading as='h2' size='md'>Valor:</Heading>
                    <Heading textAlign={'center'} display='flex'>
                        <Input
                            display={'flex'}
                            flexDirection='column'
                            focusBorderColor={'none'}
                            size={10}
                            maxLength={10}
                            placeholder="R$0.00"
                            outline={0}
                            textAlign={'center'}
                            border={'none'}
                            type={'number'}
                            name='balance'
                            {...register("balance", { required: true })}
                        />
                    </Heading>
                </Box>
                <Button
                    type="submit"
                    marginTop={2}
                    color={'white'}
                    background={'#2d61d1'}
                    w={'100%'}
                    _hover={{
                        background: "#0b428a",
                    }} >
                    Enviar
                </Button>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Box>
    )
}