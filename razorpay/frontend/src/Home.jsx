import {Box, Stack} from "@chakra-ui/react";
import Card from './Card';
import axios from "axios";

const Home = () => {

    const checkoutHandler = async (amount) => {
        const { data } = await axios.post("http://localhost:4000/api/checkout", {
            amount
        });
        console.log(data);
    }

    return ( 
        <Box>
            <Stack h={"100vh"} justifyContent="center" alignItems="center" direction={["column", "row"]}>
                <Card 
                    amount={5000} 
                    img={"https://m.media-amazon.com/images/I/51hJIsWMagL.jpg"}
                    checkoutHandler={checkoutHandler} 
                />
                <Card 
                    amount={3000} 
                    img={"https://m.media-amazon.com/images/I/71iKNJ6rVIL._AC_UF1000,1000_QL80_.jpg"}
                    checkoutHandler={checkoutHandler} 
                />
            </Stack>
        </Box>
    );
}

export default Home;
