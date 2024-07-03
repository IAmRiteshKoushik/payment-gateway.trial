import { instance } from "../server.js"
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js"

export const checkout = async (req, res) => {
    const options = {
        amount: Number(req.body.amount * 100),  // amount in smallest unit : 100 = Rs.1
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

    // console.log("signature received:", razorpay_signature);
    // console.log("signature generated:", expSignature);
    
    const isAuthentic = expSignature === razorpay_signature;

    if(isAuthentic){

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });
        res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
    } else {
        res.status(200).json({
            message: "Payment failed"
        });
    }
}
