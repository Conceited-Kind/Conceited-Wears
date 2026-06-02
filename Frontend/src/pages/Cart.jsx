import { useCart } from '../context/CartContext';
import { useState } from 'react';
import axios from 'axios';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handlePayment = async () => {
    if (!phone) {
      alert("Please enter your M-Pesa phone number");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/stk-push/', {
        phone,
        amount: total,
        order_id: Date.now()
      });

      console.log("STK Response:", res.data);

      if (res.data.CustomerMessage) {
        alert("✅ STK Push sent! Check your phone for M-Pesa prompt.");
        clearCart();
      } else {
        alert("M-Pesa Error: " + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Full Error:", err.response?.data || err);
      const errorMsg = err.response?.data?.error || err.message;
      alert("Payment Failed: " + errorMsg);
    }
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-10">YOUR CART</h1>

      {cart.length === 0 ? (
        <p className="text-xl">Your cart is empty. Start shopping!</p>
      ) : (
        <>
          <div className="space-y-6 mb-12">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-zinc-400">KES {Number(item.price).toLocaleString()}</p>
                </div>
                <button onClick={() => removeFromCart(index)} className="text-red-500 hover:underline">
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl">
            <div className="text-4xl font-bold mb-8">
              Total: KES {total.toLocaleString()}
            </div>

            <p className="text-sm text-zinc-400 mb-3">Enter your M-Pesa phone number</p>

            <input
              type="tel"
              placeholder="07xxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 p-5 rounded-2xl text-lg mb-6 focus:outline-none focus:border-violet-500"
            />

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 py-5 rounded-2xl text-xl font-semibold transition disabled:opacity-70"
            >
              {loading ? "SENDING MPESA PROMPT..." : "PAY WITH MPESA"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}