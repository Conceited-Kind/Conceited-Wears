import { ShoppingCart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="fixed top-0 w-full bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-800 z-50">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link to="/" className="text-4xl font-black tracking-[-2px]">
          CONCEITED<span className="text-violet-500">.</span>
        </Link>

        <div className="flex items-center gap-10 text-lg font-medium">
          <Link to="/shop" className="hover:text-violet-400 transition">SHOP</Link>
          
          <a 
            href="https://wa.me/254795992498?text=Hello%20Conceited%20Wears"
            target="_blank"
            className="flex items-center gap-2 hover:text-emerald-400 transition"
          >
            <MessageCircle size={24} /> CHAT
          </a>

          <Link to="/cart" className="relative">
            <ShoppingCart size={28} />
            {cart.length > 0 && (
              <div className="absolute -top-1.5 -right-1.5 bg-violet-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border border-zinc-950">
                {cart.length}
              </div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}