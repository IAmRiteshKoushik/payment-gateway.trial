import { instance } from "../server.js"
import crypto from "crypto";

export const checkout = async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),  // amount in smallest currency unit = Rs.500
        currency: "INR",
    };   

    const order = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        order,
    });
}

export const paymentVerification = async(req, res) => {
    console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.bod;
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                .update(body.toString())
                                .digest('hex');

    // console.log("sig received:", razorpay_signature);
    // console.log("sig generated:", expSignature);
    const isAuthentic = expSignature === razorpay_signature;

    if(isAuthentic){
        // Database comes here 
        res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
    } else {

    }
    // var response = {
    //     "signatureIsValid": "false",
    // }

    // if(expSignature === rp_signature){
    //     response = {
    //         "signatureIsValid": "true",
    //     }
    // }
    //
    // res.send(response);

    res.status(200).json({
        success: true,
    });
}
