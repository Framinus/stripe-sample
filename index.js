require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;
const stripe = require('stripe')(privateKey);

async function createPayment() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
    payment_method_types: ['card'],
    receipt_email: process.env.TEST_EMAIL
  }).then((res) => {
    console.log("res", res);
  }).catch(err => console.log(err));
}

console.log("createPayment call", createPayment());
