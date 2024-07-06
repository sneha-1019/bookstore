// server.js

const express = require('express');
const stripe = require('stripe')('sk_test_51PYOMfAr7fbGzUKn4y5rRwS2VZDWpiWskbwNkyezVzxXDgo06c00gnZAgffj0geb7Z2r05znOmmNaKBoFRphkCyj00i4vbPC9V');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
