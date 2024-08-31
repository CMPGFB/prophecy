import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMarkets } from '../utils/supabaseClient';

function MarketList() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const fetchedMarkets = await getMarkets();
        setMarkets(fetchedMarkets);
      } catch (error) {
        console.error('Error fetching markets:', error);
      }
    };
    fetchMarkets();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Prediction Markets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {markets.map((market) => (
          <Link key={market.id} to={`/market/${market.id}`} className="bg-purple-800 p-4 rounded shadow hover:bg-purple-700 transition-colors">
            <h3 className="font-bold mb-2">{market.question}</h3>
            <p>Yes: {market.yes_amount} STX</p>
            <p>No: {market.no_amount} STX</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MarketList;