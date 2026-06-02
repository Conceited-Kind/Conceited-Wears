import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto text-center px-6 py-32">
        <h1 className="text-7xl md:text-8xl font-black tracking-[-3px] leading-none">
          WALK LIKE<br />YOU OWN THE BLOCK.
        </h1>
        <p className="mt-8 text-xl text-zinc-400 max-w-md mx-auto">
          Premium streetwear sneakers crafted in Nairobi.
        </p>
        <Link 
          to="/shop"
          className="mt-12 inline-block bg-white text-black px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-violet-500 hover:text-white transition-all"
        >
          EXPLORE COLLECTION
        </Link>
      </div>
    </div>
  );
}