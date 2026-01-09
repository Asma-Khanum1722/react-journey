function App() {
  const blogPosts = [
    {
      id: 1,
      title: "Breaking: Tech Trends You Can’t Miss",
      excerpt:
        "Explore how AI and innovation are reshaping the digital landscape...",
      image: "/src/assets/1.jpg",
    },
    {
      id: 2,
      title: "Health & Wellness in 2025",
      excerpt:
        "Discover the latest breakthroughs in health technology and lifestyle tips...",
      image: "/src/assets/2.jpg",
    },
    {
      id: 3,
      title: "Finance Tips for Millennials",
      excerpt: "Learn smart investment strategies for the new generation...",
      image: "/src/assets/3.jpg",
    },
    {
      id: 4,
      title: "Travel: Hidden Gems Around the World",
      excerpt:
        "Experience unseen destinations with our curated travel guides...",
      image: "/src/assets/4.jpg",
    },
    {
      id: 5,
      title: "Sustainable Living Made Simple",
      excerpt: "Small changes you can make today for a greener tomorrow...",
      image: "/src/assets/5.jpg",
    },
    {
      id: 6,
      title: "Latest in Entertainment",
      excerpt: "Keep up with movies, series, and streaming trends...",
      image: "/src/assets/6.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <nav className="flex justify-between items-center p-6 bg-white shadow">
        <div className="text-2xl font-bold text-teal-600">MyWebsite</div>
        <ul className="flex space-x-6">
          <li className="hover:text-teal-500 transition cursor-pointer">
            Home
          </li>
          <li className="hover:text-teal-500 transition cursor-pointer">
            Blog
          </li>
          <li className="hover:text-teal-500 transition cursor-pointer">
            About
          </li>
          <li className="hover:text-teal-500 transition cursor-pointer">
            Contact
          </li>
        </ul>
      </nav>

      <section className="relative h-96 bg-gray-300 mt-6 mx-6 rounded-2xl overflow-hidden">
        <img
          src="/src/assets/4.jpg"
          alt="Featured"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Featured: Big Stories Today
          </h1>
          <p className="mb-4">
            Stay updated with the latest news from around the world.
          </p>
          <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded transition">
            Read More
          </button>
        </div>
      </section>

      <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition transform"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded transition">
                Read More
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-gradient-to-r from-teal-500 to-teal-700 text-white text-center p-10 mx-6 rounded-2xl mt-6">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-4">
          Get the latest news delivered straight to your inbox.
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded text-gray-800 w-60"
          />
          <button className="bg-white text-teal-700 font-bold px-4 py-2 rounded hover:bg-gray-200 transition">
            Subscribe
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 text-center p-6 mt-6">
        © 2025 MyWebsite. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
