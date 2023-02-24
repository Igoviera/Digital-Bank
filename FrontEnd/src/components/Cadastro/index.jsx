import {Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React, { useContext, useState} from 'react';
import Link from "next/link";
import { AuthContext } from "../../contexts/AuthContesxt";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const schema = yup.object({
    username: yup.string().required('O nome é obrigatório'),
    password: yup.string().min(8, 'A senha deve ter pelo menos 8 digitos').required('A senha é obrigatória'),
}).required();

export default function cadastroUser() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const { registerUser, loading } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data) {
        await registerUser(data)
        console.log(data)
    }

    return (
        <Box w={600} marginTop={18} marginLeft={3} marginRight={3}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading
                    textAlign={'center'}
                    as='h1'
                    size='xl'>Cadastrar</Heading>
                <Heading
                    marginTop={20}
                    as='h2'
                    size='md'>Nome:</Heading>
                <Input
                    h={'55px'}
                    type={'text'}
                    display={'flex'}
                    flexDirection='column'
                    marginTop={2}
                    {...register("username", { required: true })}
                    placeholder='Digite seu nome' />
                <span style={{ color: 'red', position: "absolute", marginTop: '0px' }}>{errors.username?.message}</span>

                <Heading
                    marginTop={10}
                    as='h2'
                    size='md'>Senha:
                </Heading>
                <InputGroup size='md'>
                    <Input
                        type={show ? 'text' : 'password'}
                        maxLength={36}
                        h={'55px'}
                        display={'flex'}
                        flexDirection='column'
                        marginTop={2}
                        {...register("password", { required: true })}
                        placeholder='Digite sua senha' />

                    <InputRightElement width='4rem' height='4.5rem'>
                        <Box onClick={handleClick} cursor='pointer'>
                            {show ?
                                <AiOutlineEye size={22} />
                                :
                                <AiOutlineEyeInvisible size={22} />
                            }
                        </Box>
                    </InputRightElement>
                </InputGroup>
                <Flex justifyContent={'end'} marginTop={2}>
                    <Link href="/login" style={{ color: '#1f50da' }}>
                        Fazer Login
                    </Link>
                </Flex>
                <Button
                    h={'55px'}
                    type="submit"
                    marginTop={10}
                    color={'white'}
                    background={'#2d61d1'}
                    _hover={{
                        background: "#0f5bbd",
                    }}
                    w={'100%'} >Cadastrar
                </Button>
            </form>
            {loading &&
                <Box
                    position='fixed'
                    background={'rgba(0,0,0,0.5)'}
                    top={0}
                    left={0}
                    width='100%'
                    height='100%'
                    display='flex'
                    justifyContent={'center'}
                    alignItems='center'
                >
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        color='blue.500'
                        size={'xl'}
                    />
                </Box>
            }
        </Box>
    )
}