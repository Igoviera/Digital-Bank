import { Box, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContesxt";

export function RegisterTranfer({nameCred, namedebit, value}) {
    const { user } = useContext(AuthContext)
    const valueTransfer = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    return (
        <Flex
            bg={'#EFEEEE'}
            justifyContent={"space-between"}
            borderRadius={10}
            marginTop={1}
            padding={5}>
            <Box>
             <p>{user?.username === nameCred? 'Transferencia enviada para' : 'transferência recebida de'}</p>
             <p style={{color: '#6e6e6edd', fontStyle:'italic'}}>{nameCred} </p>  
             {/* <p style={{color: '#6e6e6edd', fontStyle:'italic'}}>{namedebit} </p>   */}
            </Box>       
            <p style={{ color: '#03B42A', fontWeight: 'bold' }}>+ {valueTransfer}</p>
        </Flex>
    )
}