import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Play, Info } from "lucide-react";

const Hero = ({ movie }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (movie) {
        gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
        );
    }
  }, [movie]);

  if (!movie) return (
    <div className="h-[70vh] w-full bg-[#141414] flex items-center justify-center">
        <div className="animate-pulse text-gray-700">Loading Featured Movie...</div>
    </div>
  );

  return (
    <div ref={heroRef} className="relative h-[80vh] w-full overflow-hidden mb-12">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent z-10" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10" />
            <img 
                src={movie.Poster !== "N/A" ? movie.Poster : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80"} 
                alt={movie.Title} 
                className="w-full h-full object-cover object-top opacity-60 scale-105"
            />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 z-20 p-8 md:p-16 w-full max-w-3xl flex flex-col justify-end h-full pb-24">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter drop-shadow-2xl leading-[0.9]">
                {movie.Title}
            </h1>
            
            <div className="flex items-center gap-4 text-gray-300 mb-8 font-medium">
                <span className="text-[#46d369] font-bold">98% Match</span>
                <span>{movie.Year}</span>
                <span className="border border-gray-500 px-1.5 py-0.5 rounded text-xs text-gray-400">HD</span>
                <span className="border border-gray-500 px-1.5 py-0.5 rounded text-xs text-gray-400">{movie.Type.toUpperCase()}</span>
            </div>
            
            <p className="text-lg text-gray-300 mb-8 line-clamp-3 max-w-xl drop-shadow-md">
                Experience the thrill of this cinematic masterpiece. Dive into a world of storytelling that captivates and inspires.
                {/* Note: OMDb doesn't always provide plot effectively in search results, would need ID fetch for full details */}
            </p>

            <div className="flex gap-4">
                <button className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded hover:bg-white/90 transition duration-200 font-bold text-lg">
                    <Play size={28} fill="currentColor" /> Play
                </button>
                <button className="flex items-center gap-3 bg-[rgba(109,109,110,0.7)] text-white px-8 py-3 rounded hover:bg-[rgba(109,109,110,0.4)] transition duration-200 font-bold text-lg backdrop-blur-sm">
                    <Info size={28} /> More Info
                </button>
            </div>
        </div>
    </div>
  );
};

export default Hero;
