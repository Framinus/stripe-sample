require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY;
const stripe = require('stripe')(privateKey);
const { testPaymentId, testEmail } = require('./config');

async function createPayment() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
    payment_method_types: ['card'],
    receipt_email: testEmail
  }).then((res) => {
    console.log("res", res);
  }).catch(err => console.log(err));
};

async function getPaymentDetails(paymentIntentId) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    .then((res) => {
      console.log(res);
    }).catch(err => console.log(err));
};

async function confirmPayment(paymentIntentId) {
  const paymentIntent = await stripe.paymentIntents.confirm(
    paymentIntentId,
    { payment_method: 'pm_card_visa' }
  ).then((res) => {
    console.log(res)
  }).catch(err => console.log(err));
}

console.log(confirmPayment(testPaymentId));
