import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";

const MovieCard = ({ data }) => {
  return (
    <div className="group relative bg-[#181818] rounded-md transition-all duration-300 hover:scale-105 hover:z-50 hover:shadow-2xl cursor-pointer">
        {/* Poster Image */}
        <div className="aspect-[2/3] w-full overflow-hidden rounded-md group-hover:rounded-b-none">
            <img 
                src={data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/400x600?text=No+Poster"} 
                alt={data.Title} 
                className="w-full h-full object-cover transition-transform duration-300"
            />
        </div>

        {/* Hover Content (Netflix Style Reveal) */}
        <div className="absolute top-full left-0 w-full bg-[#181818] rounded-b-md p-4 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible -mt-1 z-50">
            <div className="flex items-center gap-2 mb-3">
                <button className="p-2 bg-white rounded-full hover:bg-gray-200 transition text-black">
                    <Play size={16} fill="currentColor" />
                </button>
                <button className="p-2 border-2 border-gray-500 rounded-full hover:border-white hover:text-white text-gray-400 transition">
                    <Plus size={16} />
                </button>
                <button className="p-2 border-2 border-gray-500 rounded-full hover:border-white hover:text-white text-gray-400 transition">
                    <ThumbsUp size={16} />
                </button>
                <button className="ml-auto p-2 border-2 border-gray-500 rounded-full hover:border-white hover:text-white text-gray-400 transition">
                    <ChevronDown size={16} />
                </button>
            </div>

            <div className="flex items-center gap-2 mb-2">
                <span className="text-green-500 font-bold text-sm">95% Match</span>
                <span className="text-gray-400 text-xs border border-gray-500 px-1">16+</span>
                <span className="text-gray-400 text-xs font-semibold">{data.Year}</span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-white">
                <span className="after:content-['•'] after:ml-2 last:after:content-['']">{data.Type}</span>
                {/* Simulated genres since OMDb search doesn't return them */}
                <span className="text-gray-400">Exciting • Action</span>
            </div>
        </div>
    </div>
  );
};

export default MovieCard;
