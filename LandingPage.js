import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Prophecy DApp</h1>
      <p className="text-xl mb-8">Predict the future, stake tokens, and earn rewards!</p>
      <div className="space-x-4">
        <Link to="/markets" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
          View Markets
        </Link>
        <Link to="/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
          Create Market
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;