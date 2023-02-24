import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContesxt";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Spinner } from '@chakra-ui/react'

const schema = yup.object({
    username: yup.string().required('O nome é obrigatório'),
    password: yup.string().min(8, 'A senha deve ter pelo menos 8 digitos').required('A senha é obrigatória'),
}).required();

export default function Login() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const { signIn, loginError, loading } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data) {
        await signIn(data)
    }

    return (
        <Box w={600} marginTop={18} marginLeft={3} marginRight={3}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex marginTop={10} justifyContent={'center'} alignItems='center'>
                    <img width={'200px'} src="logoBank.png" alt="" />
                </Flex>
                <Heading
                    marginTop={20}
                    as='h2'
                    size='md'>Nome:</Heading>
                <InputGroup>
                    <Input
                        type={'text'}
                        h={'55px'}
                        display={'flex'}
                        maxLength={36}
                        flexDirection='column'
                        marginTop={2}
                        {...register("username", { required: true })}
                        placeholder='Digite seu nome' />

                    <span
                        style={{ color: 'red', position: "absolute", marginTop: '65px' }}>
                        {errors.username?.message}
                    </span>

                </InputGroup>

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
                {loginError ?
                    <span
                        style={{ color: 'red', position: "absolute", marginTop: '0px' }}>
                        {loginError}
                    </span>
                    :
                    <span
                        style={{ color: 'red', position: "absolute", marginTop: '0px' }}>
                        {errors.password?.message}
                    </span>

                }

                <Flex justifyContent={'end'} marginTop={8}>
                    <p>Não tem conta? <Link
                        href="/cadastro" style={{ color: '#1f50da' }}>Cadastre-se</Link></p>
                </Flex>

                <Button
                    h={'55px'}
                    type="submit"
                    marginTop={5}
                    color={'white'}
                    background={'#2d61d1'}
                    _hover={{
                        background: "#0f5bbd",
                    }}
                    w={'100%'} >Entrar
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