import React, { useEffect, useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number | null;
  price_change_percentage_24h: number | null;
  image: string;
}

const App: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('market_cap_desc');

  const API_URL = 'https://yourdomain.com:1414/api/getData'; // api url (change by your needs)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const { data } = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedCryptos = cryptos
    .filter((crypto) => {
      if (search.trim() === '') return true;

      return (
        crypto.name.toLowerCase().includes(search.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'market_cap_desc':
          return (b.current_price || 0) - (a.current_price || 0);
        case 'market_cap_asc':
          return (a.current_price || 0) - (b.current_price || 0);
        case 'volume_desc':
          return (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0);
        case 'volume_asc':
          return (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0);
        case 'price_desc':
          return (b.current_price || 0) - (a.current_price || 0);
        case 'price_asc':
          return (a.current_price || 0) - (b.current_price || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200 p-6">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-5xl font-bold text-purple-400">FindYourCrypto</h1>
        <i className="fas fa-search text-purple-400 text-3xl ml-4"></i>
      </div>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="market_cap_desc">Market Cap (High to Low)</option>
          <option value="market_cap_asc">Market Cap (Low to High)</option>
          <option value="volume_desc">Volume (High to Low)</option>
          <option value="volume_asc">Volume (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
          <option value="price_asc">Price (Low to High)</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCryptos.length > 0 ? (
            displayedCryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition duration-300"
              >
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-16 h-16 mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-100">
                  {crypto.name} ({crypto.symbol.toUpperCase()})
                </h2>
                <p className="text-lg font-bold text-gray-200 mt-2">
                  {crypto.current_price !== null ? `$${crypto.current_price.toLocaleString()}` : 'N/A'}
                </p>
                <p
                  className={`flex items-center text-sm font-medium mt-2 ${
                    crypto.price_change_percentage_24h !== null
                      ? crypto.price_change_percentage_24h > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                      : 'text-gray-400'
                  }`}
                >
                  {crypto.price_change_percentage_24h !== null
                    ? `${crypto.price_change_percentage_24h.toFixed(2)}% (24h)`
                    : 'N/A'}
                  {crypto.price_change_percentage_24h !== null && (
                    crypto.price_change_percentage_24h > 0 ? (
                      <i className="ml-2 fas fa-arrow-up"></i>
                    ) : (
                      <i className="ml-2 fas fa-arrow-down"></i>
                    )
                  )}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
