import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, Film, Star, ExternalLink, X, Play, Clock, Calendar, Youtube, Menu, Flame, Clapperboard, Tv, History, Trash2, Bookmark, BookmarkCheck, List } from "lucide-react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("trending");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [contentType, setContentType] = useState("movie");
  const [myList, setMyList] = useState([]);
  const gridRef = useRef(null);
  
  const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const savedHistory = localStorage.getItem("cinevault_history");
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory));
    
    const savedList = localStorage.getItem("cinevault_mylist");
    if (savedList) setMyList(JSON.parse(savedList));
    
    fetchInitialData();
  }, []);

  // My List functions
  const isInMyList = (id) => myList.some(item => item.id === id);
  
  const toggleMyList = (item, e) => {
    if (e) e.stopPropagation();
    let newList;
    if (isInMyList(item.id)) {
      newList = myList.filter(m => m.id !== item.id);
    } else {
      const listItem = {
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
        release_date: item.release_date || item.first_air_date,
        type: item.first_air_date ? "tv" : "movie"
      };
      newList = [listItem, ...myList];
    }
    setMyList(newList);
    localStorage.setItem("cinevault_mylist", JSON.stringify(newList));
  };

  const saveToHistory = (term) => {
    if (!term.trim()) return;
    const newHistory = [term, ...searchHistory.filter(h => h.toLowerCase() !== term.toLowerCase())].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem("cinevault_history", JSON.stringify(newHistory));
  };

  const clearHistory = () => { setSearchHistory([]); localStorage.removeItem("cinevault_history"); setShowHistory(false); };
  const removeFromHistory = (term) => { 
    const newHistory = searchHistory.filter(h => h !== term);
    setSearchHistory(newHistory);
    localStorage.setItem("cinevault_history", JSON.stringify(newHistory));
  };

  async function fetchInitialData() {
    try {
      const trendingRes = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`);
      const trendingData = await trendingRes.json();
      setTrendingMovies(trendingData.results || []);
      if (trendingData.results?.length > 0) setFeaturedMovie(trendingData.results[0]);

      const topRatedRes = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_KEY}`);
      const topRatedData = await topRatedRes.json();
      setTopRatedMovies(topRatedData.results || []);

      const popularRes = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}`);
      const popularData = await popularRes.json();
      setPopularMovies(popularData.results || []);

      const tvRes = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_KEY}`);
      const tvData = await tvRes.json();
      setTvShows(tvData.results || []);
      
      setMovies(trendingData.results || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  useEffect(() => {
    if (movies.length > 0 && gridRef.current) {
      gsap.fromTo(gridRef.current.children, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" });
    }
  }, [movies, activeCategory]);

  useEffect(() => {
    document.body.style.overflow = selectedMovie ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedMovie]);

  async function searchContent(query) {
    if (!query.trim()) return;
    setIsLoading(true);
    setActiveCategory("search");
    setShowHistory(false);
    saveToHistory(query);
    
    try {
      const endpoint = contentType === "tv" ? "search/tv" : "search/movie";
      const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setMovies([]);
    }
    setIsLoading(false);
  }

  async function fetchTrailer(id, type = "movie") {
    setIsLoadingTrailer(true);
    setTrailerKey(null);
    try {
      const videosRes = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${TMDB_KEY}`);
      const videosData = await videosRes.json();
      const trailer = videosData.results?.find(v => v.type === "Trailer" && v.site === "YouTube") 
        || videosData.results?.find(v => v.type === "Teaser" && v.site === "YouTube") 
        || videosData.results?.find(v => v.site === "YouTube");
      if (trailer) setTrailerKey(trailer.key);
    } catch (err) { console.error("Error fetching trailer:", err); }
    setIsLoadingTrailer(false);
  }

  async function openDetails(item) {
    try {
      const type = contentType === "tv" || item.first_air_date ? "tv" : "movie";
      const detailRes = await fetch(`https://api.themoviedb.org/3/${type}/${item.id}?api_key=${TMDB_KEY}&append_to_response=credits`);
      const detailData = await detailRes.json();
      detailData._type = type;
      setSelectedMovie(detailData);
      setTrailerKey(null);
      fetchTrailer(item.id, type);
    } catch (err) { console.error("Error fetching details:", err); }
  }

  const handleSearch = () => searchContent(searchTerm);
  const closeModal = () => { setSelectedMovie(null); setTrailerKey(null); };

  const switchCategory = (category, type = "movie") => {
    setActiveCategory(category);
    setContentType(type);
    setSearchTerm("");
    setShowHistory(false);
    
    if (category === "trending") setMovies(trendingMovies);
    else if (category === "toprated") setMovies(topRatedMovies);
    else if (category === "movies") setMovies(popularMovies);
    else if (category === "tvshows") setMovies(tvShows);
    else if (category === "mylist") setMovies(myList);
  };

  const getBackdropUrl = (path) => path ? `https://image.tmdb.org/t/p/original${path}` : "";
  const getPosterUrl = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : "";
  const getTitle = (item) => item.title || item.name;
  const getYear = (item) => (item.release_date || item.first_air_date)?.split("-")[0];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-['Outfit'] selection:bg-violet-500 overflow-x-hidden flex flex-col">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full px-4 md:px-8 py-4 z-50 flex justify-between items-center bg-gradient-to-b from-black/95 via-black/70 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Film size={20} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Cine<span className="text-violet-400">Vault</span></h1>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button onClick={() => switchCategory("trending")} className={`hover:text-white transition flex items-center gap-1.5 ${activeCategory === "trending" ? "text-violet-400" : ""}`}>
            <Flame size={16}/>Trending
          </button>
          <button onClick={() => switchCategory("toprated")} className={`hover:text-white transition flex items-center gap-1.5 ${activeCategory === "toprated" ? "text-violet-400" : ""}`}>
            <Star size={16}/>Top Rated
          </button>
          <button onClick={() => switchCategory("movies")} className={`hover:text-white transition flex items-center gap-1.5 ${activeCategory === "movies" ? "text-violet-400" : ""}`}>
            <Clapperboard size={16}/>Movies
          </button>
          <button onClick={() => switchCategory("tvshows", "tv")} className={`hover:text-white transition flex items-center gap-1.5 ${activeCategory === "tvshows" ? "text-violet-400" : ""}`}>
            <Tv size={16}/>TV Shows
          </button>
          <button onClick={() => switchCategory("mylist")} className={`hover:text-white transition flex items-center gap-1.5 ${activeCategory === "mylist" ? "text-violet-400" : ""}`}>
            <Bookmark size={16}/>My List {myList.length > 0 && <span className="bg-violet-500 text-white text-xs px-1.5 py-0.5 rounded-full">{myList.length}</span>}
          </button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-white/10 rounded-lg transition">
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg md:hidden flex flex-col">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-bold">Cine<span className="text-violet-400">Vault</span></h1>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2"><X size={24}/></button>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <button onClick={() => {switchCategory("trending"); setMobileMenuOpen(false);}} className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition text-lg"><Flame size={20}/> Trending</button>
            <button onClick={() => {switchCategory("toprated"); setMobileMenuOpen(false);}} className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition text-lg"><Star size={20}/> Top Rated</button>
            <button onClick={() => {switchCategory("movies"); setMobileMenuOpen(false);}} className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition text-lg"><Clapperboard size={20}/> Movies</button>
            <button onClick={() => {switchCategory("tvshows", "tv"); setMobileMenuOpen(false);}} className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition text-lg"><Tv size={20}/> TV Shows</button>
            <button onClick={() => {switchCategory("mylist"); setMobileMenuOpen(false);}} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/10 transition text-lg">
              <span className="flex items-center gap-3"><Bookmark size={20}/> My List</span>
              {myList.length > 0 && <span className="bg-violet-500 text-white text-sm px-2 py-0.5 rounded-full">{myList.length}</span>}
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      {featuredMovie && activeCategory !== "mylist" && (
        <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/40 z-10" />
            <img src={getBackdropUrl(featuredMovie.backdrop_path)} alt={getTitle(featuredMovie)} className="w-full h-full object-cover object-center"/>
          </div>
          <div className="absolute bottom-0 left-0 z-20 p-4 md:p-16 w-full max-w-2xl flex flex-col justify-end h-full pb-20 md:pb-32">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
              <span className="bg-violet-500/20 text-violet-300 px-2 md:px-3 py-1 rounded-full text-xs font-semibold border border-violet-500/30 backdrop-blur-sm">⭐ {featuredMovie.vote_average?.toFixed(1)} TMDB</span>
              <span className="text-slate-400 text-xs md:text-sm">{getYear(featuredMovie)}</span>
            </div>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 tracking-tight leading-tight">{getTitle(featuredMovie)}</h1>
            <p className="text-sm md:text-base text-slate-300 mb-4 md:mb-8 line-clamp-2 md:line-clamp-3 max-w-xl leading-relaxed">{featuredMovie.overview}</p>
            <div className="flex gap-3 md:gap-4 flex-wrap">
              <button onClick={() => openDetails(featuredMovie)} className="flex items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all shadow-lg shadow-violet-500/30 hover:scale-105 text-sm md:text-base">
                <Play size={18} fill="currentColor"/> Watch Trailer
              </button>
              <button 
                onClick={(e) => toggleMyList(featuredMovie, e)}
                className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all text-sm md:text-base ${isInMyList(featuredMovie.id) ? "bg-violet-500 text-white" : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10"}`}
              >
                {isInMyList(featuredMovie.id) ? <BookmarkCheck size={18}/> : <Bookmark size={18}/>}
                {isInMyList(featuredMovie.id) ? "In My List" : "My List"}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* My List Header when viewing saved items */}
      {activeCategory === "mylist" && (
        <div className="pt-24 md:pt-32 px-4 md:px-8 lg:px-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
              <Bookmark size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">My List</h1>
              <p className="text-slate-400 text-sm">{myList.length} {myList.length === 1 ? "item" : "items"} saved</p>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className={`px-4 md:px-8 lg:px-12 relative z-30 flex-1 ${activeCategory === "mylist" ? "" : "-mt-16 md:-mt-24"}`}>
        
        {/* Search - hide on My List */}
        {activeCategory !== "mylist" && (
          <div className="relative w-full max-w-xl mx-auto mb-8 md:mb-12">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-12 pr-24 md:pr-28 py-3 md:py-4 bg-[#12121a]/90 border border-slate-800 rounded-xl md:rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 text-base transition-all backdrop-blur-sm"
                placeholder={contentType === "tv" ? "Search TV shows..." : "Search movies..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowHistory(true)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <div className="absolute inset-y-0 right-1.5 flex items-center">
                <button onClick={handleSearch} className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white px-4 md:px-5 py-2 rounded-lg md:rounded-xl font-semibold transition-all text-sm shadow-md">Search</button>
              </div>
            </div>

            {showHistory && searchHistory.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#12121a] border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b border-slate-800">
                  <span className="text-sm text-slate-400 flex items-center gap-2"><History size={14}/> Recent</span>
                  <button onClick={clearHistory} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"><Trash2 size={12}/> Clear</button>
                </div>
                {searchHistory.map((term, i) => (
                  <div key={i} className="flex items-center justify-between hover:bg-white/5 transition">
                    <button onClick={() => { setSearchTerm(term); searchContent(term); }} className="flex-1 text-left px-4 py-3 text-sm text-slate-300">{term}</button>
                    <button onClick={() => removeFromHistory(term)} className="p-3 text-slate-500 hover:text-red-400"><X size={14}/></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {showHistory && <div className="fixed inset-0 z-40" onClick={() => setShowHistory(false)}></div>}

        {/* Category Tabs Mobile */}
        <div className="flex md:hidden gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <button onClick={() => switchCategory("trending")} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === "trending" ? "bg-violet-500 text-white" : "bg-white/10 text-slate-300"}`}>🔥 Trending</button>
          <button onClick={() => switchCategory("toprated")} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === "toprated" ? "bg-violet-500 text-white" : "bg-white/10 text-slate-300"}`}>⭐ Top Rated</button>
          <button onClick={() => switchCategory("movies")} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === "movies" ? "bg-violet-500 text-white" : "bg-white/10 text-slate-300"}`}>🎬 Movies</button>
          <button onClick={() => switchCategory("tvshows", "tv")} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === "tvshows" ? "bg-violet-500 text-white" : "bg-white/10 text-slate-300"}`}>📺 TV Shows</button>
          <button onClick={() => switchCategory("mylist")} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-1.5 ${activeCategory === "mylist" ? "bg-violet-500 text-white" : "bg-white/10 text-slate-300"}`}>
            📑 My List {myList.length > 0 && <span className="bg-white/20 px-1.5 rounded-full text-xs">{myList.length}</span>}
          </button>
        </div>

        {/* Section Title */}
        {activeCategory !== "mylist" && (
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-3">
            <span className="w-1 md:w-1.5 h-6 md:h-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full"></span>
            {activeCategory === "search" ? `Results for "${searchTerm}"` : activeCategory === "toprated" ? "Top Rated" : activeCategory === "movies" ? "Popular Movies" : activeCategory === "tvshows" ? "Popular TV Shows" : "Trending This Week"}
          </h2>
        )}
        
        {isLoading && <div className="flex justify-center py-20"><div className="w-10 h-10 md:w-12 md:h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div></div>}

        {!isLoading && movies.length > 0 && (
          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5 pb-16 md:pb-20">
            {movies.filter((m) => m.poster_path).map((m) => (
              <div key={m.id} onClick={() => openDetails(m)} className="group relative bg-[#12121a] rounded-lg md:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20 hover:z-10">
                <div className="aspect-[2/3] w-full overflow-hidden">
                  <img src={getPosterUrl(m.poster_path)} alt={getTitle(m)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy"/>
                </div>
                {/* Bookmark indicator */}
                {isInMyList(m.id) && (
                  <div className="absolute top-2 right-2 bg-violet-500 p-1.5 rounded-lg shadow-lg">
                    <BookmarkCheck size={14} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 md:p-4">
                  <h3 className="font-semibold text-xs md:text-sm line-clamp-2">{getTitle(m)}</h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Star size={12} className="text-yellow-400" fill="currentColor"/>{m.vote_average?.toFixed(1)} • {getYear(m)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && movies.length === 0 && (
          <div className="text-center py-16 md:py-20 text-slate-500">
            {activeCategory === "mylist" ? (
              <>
                <Bookmark size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg md:text-xl mb-2">Your list is empty</p>
                <p className="text-sm text-slate-600">Start adding movies and shows to build your watchlist!</p>
              </>
            ) : (
              <>
                <Film size={40} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg md:text-xl">No results found.</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0f] border-t border-slate-800/50 py-8 md:py-12 px-4 md:px-8 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                <Film size={16} />
              </div>
              <span className="text-lg font-bold">Cine<span className="text-violet-400">Vault</span></span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition">About</a>
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              🎬 Crafted with cinema magic by <span className="text-violet-400 font-semibold hover:text-fuchsia-400 transition-colors cursor-default">Asma</span> ✨
            </p>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} CineVault. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {selectedMovie && (
        <div className="fixed inset-0 z-[100] bg-black/95 overflow-y-auto" onClick={closeModal}>
          <div className="min-h-full flex items-start justify-center py-4 md:py-8 px-0 md:px-4">
            <div className="bg-[#0f0f15] w-full md:max-w-4xl md:rounded-2xl border-0 md:border border-slate-800 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full aspect-video bg-black flex-shrink-0">
                {trailerKey ? (
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`} title="Trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-gradient-to-b from-slate-900 to-black">
                    {isLoadingTrailer ? (<><div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4"></div><p className="text-sm">Loading...</p></>) : (
                      <><Youtube size={48} className="mb-4 opacity-50" /><p className="text-sm">Trailer not available</p><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(getTitle(selectedMovie) + " trailer")}`} target="_blank" rel="noopener noreferrer" className="mt-3 text-violet-400 hover:text-violet-300 text-sm underline">Search on YouTube</a></>
                    )}
                  </div>
                )}
                <button onClick={closeModal} className="absolute top-3 right-3 md:top-4 md:right-4 bg-black/70 hover:bg-black p-2 rounded-full transition-colors z-10"><X size={20} /></button>
              </div>

              <div className="p-4 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-xl md:text-3xl font-bold">{getTitle(selectedMovie)}</h2>
                  <button 
                    onClick={(e) => toggleMyList(selectedMovie, e)}
                    className={`shrink-0 p-2.5 rounded-xl transition-all ${isInMyList(selectedMovie.id) ? "bg-violet-500 text-white" : "bg-white/10 hover:bg-white/20 text-white"}`}
                  >
                    {isInMyList(selectedMovie.id) ? <BookmarkCheck size={20}/> : <Bookmark size={20}/>}
                  </button>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-slate-300 mb-4 md:mb-6">
                  <span className="flex items-center gap-1 text-yellow-400 font-semibold"><Star size={14} fill="currentColor"/> {selectedMovie.vote_average?.toFixed(1)}</span>
                  <span className="flex items-center gap-1"><Calendar size={14}/> {getYear(selectedMovie)}</span>
                  {selectedMovie.runtime && <span className="flex items-center gap-1"><Clock size={14}/> {selectedMovie.runtime} min</span>}
                  {selectedMovie.number_of_seasons && <span className="flex items-center gap-1"><Tv size={14}/> {selectedMovie.number_of_seasons} Seasons</span>}
                </div>
                <p className="text-slate-300 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">{selectedMovie.overview}</p>
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">{selectedMovie.genres?.map(g => (<span key={g.id} className="px-3 py-1 bg-white/10 rounded-full text-xs md:text-sm text-slate-300">{g.name}</span>))}</div>
                {selectedMovie.credits?.cast?.length > 0 && (<div className="mb-4 md:mb-6"><p className="text-slate-500 text-xs md:text-sm mb-2">Cast</p><p className="text-white text-sm md:text-base">{selectedMovie.credits.cast.slice(0, 5).map(c => c.name).join(", ")}</p></div>)}
                <div className="flex gap-3 flex-wrap pb-4">
                  <a href={`https://www.themoviedb.org/${selectedMovie._type}/${selectedMovie.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold transition-all text-sm"><ExternalLink size={16}/> View on TMDB</a>
                  <button onClick={closeModal} className="bg-slate-800 hover:bg-slate-700 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl font-semibold transition-all text-sm">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
