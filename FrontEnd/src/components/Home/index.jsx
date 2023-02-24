import { Box, Button, color, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContesxt";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Router from "next/router";


export default function HomeApp() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const { user, logout } = useContext(AuthContext)

    const userArray = []

    userArray.push(user)

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies()
        if (!token) {
            Router.push('/login')
        }
    }, [])

    return (
        <Box w={600} marginTop={18} marginLeft={3} marginRight={3} >
            <Flex justifyContent={'space-between'}>
                <Box>
                    <Heading as='h1' size={'lg'}> Olá, {user?.data.username}</Heading>
                </Box>
                <Button onClick={() => logout()} color={'white'} w={100} background={'#2d61d1'} _hover={{
                    background: "#0f5bbd",
                }} >
                    Sair
                </Button>
            </Flex>
            <Box bg={'#2d61d1'} borderRadius={20} color='white' padding={5} marginTop={5}>
                <Flex justifyContent={"space-between"}>
                    <Box>
                        <p>Disponível</p>
                        <h1 style={{ fontSize: '30px', color: '#03B42A', fontWeight: 'bold' }}>
                            <Flex alignItems={'center'} gap={3} fontSize='23px'>
                                {show ? Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                    .format(user?.data.accounts.balance) : '*****'}
                            </Flex>
                        </h1>
                    </Box>
                    <Box onClick={handleClick} cursor='pointer'>
                        {show ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
                    </Box>
                </Flex>
                <Box>
                    <Link href='/transferencia'>
                        <Button marginTop={8} color={'black'} fontSize={'12px'}>
                            Transferir
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Box marginTop={10}>
                <Heading fontSize='18px' marginBottom={1}>Transações</Heading>
                <Box>
                    {userArray.map((user, index) => (
                        <Box
                            bg={'#f7f7f7'}
                            padding={5}
                            borderRadius={10}
                            height='400px'
                            overflowY='scroll'
                            key={index}>
                            {user?.data.accounts?.crediteAccount?.map((valor, index) => (
                                <Flex
                                    borderTop={'1px solid #aaaaaa'}
                                    justifyContent='space-between'
                                    marginTop={'15px'}
                                    paddingTop={'15px'}
                                    key={index}>
                                    <p>Valor recebido de</p>
                                    <span>{valor.debitedAccount?.users.username}</span>
                                    <p style={{ color: '#06A916', fontWeight: 'bold' }}> +
                                        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                            .format(valor.value)}
                                    </p>
                                </Flex>
                            ))}
                            {user?.data.accounts?.debitedAccount?.map((valor, index) => (
                                <Flex
                                    borderTop={'1px solid #aaaaaa'}
                                    justifyContent='space-between'
                                    marginTop={'15px'}
                                    paddingTop={'15px'}
                                    key={index}>
                                    <p>Valor enviado para</p>
                                    <span>{valor.crediteAccount?.users.username}</span>
                                    <p style={{ fontWeight: 'bold' }}> -
                                        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                            .format(valor.value)}
                                    </p>
                                </Flex>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

// export const getServerSideProps = async (res) => {
//     try {
//         //const token = getCookie('nextauth.token', { req, res })
//         const { ['nextauth.token']: token } = parseCookies(res)
//         console.log('+++++')
//         console.log(token)
//         return {
//             props: {}
//         }

//     } catch (error) {
//         return {
//             props: {}
//         }
//     }

// }