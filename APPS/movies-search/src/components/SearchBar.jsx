import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto mb-16 px-4">
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-white transition-colors" />
            </div>
            <input 
                type="text" 
                className="block w-full pl-12 pr-4 py-4 bg-black/50 border border-gray-700 rounded-full leading-5 text-gray-100 placeholder-gray-500 focus:outline-none focus:bg-black/80 focus:border-white/50 focus:ring-1 focus:ring-white/50 sm:text-lg transition-all duration-300 backdrop-blur-md shadow-lg"
                placeholder="Titles, people, genres"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
                 <button 
                    onClick={handleSearch}
                    className="bg-[#E50914] hover:bg-[#b00710] text-white px-6 py-2 rounded-full font-medium transition-colors text-sm"
                >
                    Search
                 </button>
            </div>
        </div>
    </div>
  );
};
export default SearchBar;
