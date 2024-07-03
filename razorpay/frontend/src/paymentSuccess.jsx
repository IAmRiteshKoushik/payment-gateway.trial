import { Box, Heading, VStack, Text } from "@chakra-ui/react"
import { useSearchParams } from "react-router-dom"

const PaymentSuccess = () => {

    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");
    

  return (
        <Box>
            <VStack>
                <Heading textTransform={"uppercase"}>Order Successful!</Heading>
                <Text>Reference No. {referenceNum}</Text>
            </VStack>
        </Box>
  )
}

export default PaymentSuccess
