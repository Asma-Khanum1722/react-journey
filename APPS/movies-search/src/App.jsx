import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, Film, TrendingUp, Star, ExternalLink, X, Play, Clock, Calendar } from "lucide-react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const gridRef = useRef(null);
  const API_KEY = "7c63e6";

  // Initial fetch
  useEffect(() => {
    const featuredTitles = ["Interstellar", "Dune", "Inception", "The Dark Knight", "Avatar"];
    const randomTitle = featuredTitles[Math.floor(Math.random() * featuredTitles.length)];

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${randomTitle}&plot=full`)
      .then(res => res.json())
      .then(data => { if(data.Response === "True") setFeaturedMovie(data); });
      
    searchMovies("Marvel");
  }, []);

  // GSAP animation for grid
  useEffect(() => {
    if (movies.length > 0 && gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
      );
    }
  }, [movies]);

  async function searchMovies(title) {
    setIsLoading(true);
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
    const data = await response.json();
    setIsLoading(false);
     
    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  }

  async function fetchMovieDetails(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    const data = await response.json();
    if (data.Response === "True") {
      setSelectedMovie(data);
    }
  }

  const handleSearch = () => {
    if(searchTerm.trim()) {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['Outfit'] selection:bg-violet-500">
      
      {/* === NAVBAR === */}
      <nav className="fixed top-0 w-full p-4 md:p-6 z-50 flex justify-between items-center bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Film size={22} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Cine<span className="text-violet-400">Vault</span>
          </h1>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition flex items-center gap-1"><TrendingUp size={16}/>Trending</a>
          <a href="#" className="hover:text-white transition flex items-center gap-1"><Star size={16}/>Top Rated</a>
          <a href="#" className="hover:text-white transition">Genres</a>
        </div>
      </nav>

      {/* === HERO SECTION === */}
      {featuredMovie && (
        <section className="relative h-[85vh] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/30 z-10" />
            <img 
              src={featuredMovie.Poster !== "N/A" ? featuredMovie.Poster : ""} 
              alt={featuredMovie.Title} 
              className="w-full h-full object-cover object-top opacity-50 scale-110 blur-sm"
            />
          </div>

          <div className="absolute bottom-0 left-0 z-20 p-6 md:p-16 w-full max-w-3xl flex flex-col justify-end h-full pb-32">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-xs font-semibold border border-violet-500/30 backdrop-blur-sm">
                ⭐ {featuredMovie.imdbRating || "N/A"} IMDB
              </span>
              <span className="text-slate-400 text-sm">{featuredMovie.Year}</span>
              <span className="text-slate-400 text-sm">•</span>
              <span className="text-slate-400 text-sm">{featuredMovie.Runtime}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
              {featuredMovie.Title}
            </h1>
            
            <p className="text-base md:text-lg text-slate-300 mb-8 line-clamp-3 max-w-xl leading-relaxed">
              {featuredMovie.Plot}
            </p>

            <div className="flex gap-4 flex-wrap">
              <button 
                onClick={() => setSelectedMovie(featuredMovie)}
                className="flex items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-400/40 hover:scale-105"
              >
                <Play size={20} fill="currentColor"/> Watch Trailer
              </button>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all backdrop-blur-sm border border-white/10">
                <Star size={20}/> Add to List
              </button>
            </div>
          </div>
        </section>
      )}

      {/* === CONTENT AREA === */}
      <div className="px-4 md:px-12 relative z-30 -mt-24">
        
        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-14 pr-28 py-4 bg-[#12121a] border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 text-lg transition-all"
              placeholder="Search movies, shows, genres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all text-sm shadow-md"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full"></span>
          {searchTerm ? `Results for "${searchTerm}"` : "Trending Now"}
        </h2>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Movies Grid */}
        {!isLoading && movies.length > 0 && (
          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 pb-20">
            {movies
              .filter((movie) => movie.Poster && movie.Poster !== "N/A")
              .map((movie) => (
                <div 
                  key={movie.imdbID} 
                  onClick={() => fetchMovieDetails(movie.imdbID)}
                  className="group relative bg-[#12121a] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20 hover:z-10"
                >
                  <div className="aspect-[2/3] w-full overflow-hidden">
                    <img 
                      src={movie.Poster} 
                      alt={movie.Title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <h3 className="font-semibold text-sm line-clamp-2">{movie.Title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{movie.Year} • {movie.Type}</p>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && movies.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Film size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl">No movies found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* === MOVIE DETAILS MODAL === */}
      {selectedMovie && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedMovie(null)}
        >
          <div 
            className="bg-[#12121a] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-t-3xl">
              <img 
                src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : ""} 
                alt={selectedMovie.Title}
                className="w-full h-full object-cover opacity-60 blur-sm scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent" />
              <button 
                onClick={() => setSelectedMovie(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="absolute bottom-0 left-0 p-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedMovie.Title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                  <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400" fill="currentColor"/> {selectedMovie.imdbRating}</span>
                  <span className="flex items-center gap-1"><Calendar size={16}/> {selectedMovie.Year}</span>
                  <span className="flex items-center gap-1"><Clock size={16}/> {selectedMovie.Runtime}</span>
                  <span className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-xs">{selectedMovie.Rated}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <p className="text-slate-300 leading-relaxed mb-6">{selectedMovie.Plot}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Genre</p>
                  <p className="text-white font-medium">{selectedMovie.Genre}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Director</p>
                  <p className="text-white font-medium">{selectedMovie.Director}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-slate-500 mb-1">Cast</p>
                  <p className="text-white font-medium">{selectedMovie.Actors}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <a 
                  href={`https://www.imdb.com/title/${selectedMovie.imdbID}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  <ExternalLink size={18}/> View on IMDB
                </a>
                <button 
                  onClick={() => setSelectedMovie(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
