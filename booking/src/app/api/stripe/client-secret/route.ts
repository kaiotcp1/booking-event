import { NextResponse } from "next/server";

const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

export async function POST(request: NextResponse) {
    try {
        //generate a client secret
        const reqBody = await request.json();
        const amount = reqBody.amount;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            metadata: { integration_check: 'accept_a_payment' },
        });
        const clientSecret = paymentIntent.client_secret;
        return NextResponse.json({ clientSecret: clientSecret });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    };
};