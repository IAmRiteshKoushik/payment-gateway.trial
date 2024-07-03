import {Box, Stack} from "@chakra-ui/react";
import Card from './Card';
import axios from "axios";

const Home = () => {

    const checkoutHandler = async (amount) => {

        const { data: {key} } = await axios.get("http://localhost:4000/api/getkey");
        const { data: {order} } = await axios.post("http://localhost:4000/api/checkout", {
            amount
        });

        var options = {
            key, 
            amount: order.amount,
            currency: "INR",
            name: "RK Industries",
            description: "Tutorial of RazorPay",
            image: "https://avatars.githubusercontent.com/u/72215925",
            order_id: order.id,
            callback_url: "http://localhost:4000/api/paymentVerification",
            prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
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
