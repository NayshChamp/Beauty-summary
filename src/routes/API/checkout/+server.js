import { json } from '@sveltejs/kit';

/**
 * M-Pesa Sandbox Simulation
 * In production, this would integrate with Safaricom Daraja API (STK Push).
 * For demo: simulates the full flow with a delay.
 */
export async function POST({ request }) {
  try {
    const body = await request.json();
    const { total, phone } = body;

    if (!total || total <= 0) {
      return json({ error: 'Invalid order total' }, { status: 400 });
    }

    // Validate phone format (254XXXXXXXXX or 07XXXXXXXX)
    const rawPhone = (phone || '').replace(/\s/g, '');
    let mpesaPhone = rawPhone;
    if (rawPhone.startsWith('0')) {
      mpesaPhone = '254' + rawPhone.slice(1);
    } else if (rawPhone.startsWith('7')) {
      mpesaPhone = '254' + rawPhone;
    } else if (!rawPhone.startsWith('254')) {
      mpesaPhone = '254' + rawPhone;
    }

    // Sandbox: simulate STK push (2-3 sec) and callback
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Simulated M-Pesa success response
    return json({
      success: true,
      message: `Payment of KES ${Number(total).toLocaleString()} successful!`,
      receipt: 'MP' + Date.now().toString(36).toUpperCase(),
      phone: mpesaPhone,
      amount: total,
    });
  } catch (err) {
    console.error('Checkout error:', err);
    return json({ error: 'Checkout failed' }, { status: 500 });
  }
}
