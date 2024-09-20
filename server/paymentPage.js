const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const FRONT_END_URL = process.env.FRONT_END_URL;

async function createPaymentSession(req, res) {
  try {
    const { userId, products, total } = req.body;

    if (!products ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map((product) => ({
        price_data: {
          currency: 'inr',
          unit_amount: product.price * 100, // Convert to cents
          product_data: {
            name: product.name,
            images: [product.imageUrl],
          },
        },
        quantity: product.quantity,
      })),
      mode: 'payment',
      success_url: `${FRONT_END_URL}/user`,
      cancel_url: `${FRONT_END_URL}/cart`,
    });

    return res.json(session);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create payment session' });
  }
}

module.exports = createPaymentSession;