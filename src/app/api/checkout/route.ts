import { NextResponse } from "next/server";

const stripeKey = process.env.STRIPE_SECRET_KEY;

export async function POST(request: Request) {
  if (!stripeKey) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 }
    );
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeKey, {
    apiVersion: "2026-05-27.dahlia",
  });

  try {
    const { amount } = await request.json();
    const unitAmount = Math.round(parseFloat(amount || "1500") * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Rent Payment",
              description: "Monthly rent payment",
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}