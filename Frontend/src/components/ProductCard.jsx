import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-violet-500 transition-all duration-300">
      <div className="relative h-80 bg-zinc-950 flex items-center justify-center">
        <img 
          src={product.image || "https://via.placeholder.com/400?text=Conceited+Shoe"} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-zinc-400 text-sm mt-1">{product.category}</p>
        <div className="flex justify-between items-end mt-6">
          <span className="text-3xl font-bold">KES {Number(product.price).toLocaleString()}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-white text-black px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-violet-500 hover:text-white transition"
          >
            <ShoppingCart size={20} /> ADD
          </button>
        </div>
      </div>
    </div>
  );
}