import React, { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { getUserMarkets, updateMarket } from '../utils/supabaseClient';
import { claimRewardOnChain } from '../utils/contractUtils';

function UserDashboard({ userData }) {
  const [userMarkets, setUserMarkets] = useState([]);
  const { doContractCall } = useConnect();

  useEffect(() => {
    const fetchUserMarkets = async () => {
      if (userData) {
        try {
          const markets = await getUserMarkets(userData.profile.stxAddress);
          setUserMarkets(markets);
        } catch (error) {
          console.error('Error fetching user markets:', error);
        }
      }
    };
    fetchUserMarkets();
  }, [userData]);

  const handleClaimReward = async (marketId) => {
    try {
      // First, claim the reward on-chain
      await claimRewardOnChain(doContractCall, marketId);
      
      // Then, update the off-chain data
      await updateMarket(marketId, { reward_claimed: true });
      
      // Refresh the user markets
      const updatedMarkets = await getUserMarkets(userData.profile.stxAddress);
      setUserMarkets(updatedMarkets);
      
      alert('Reward claimed successfully!');
    } catch (error) {
      console.error('Error claiming reward:', error);
      alert('Failed to claim reward. Please try again.');
    }
  };

  if (!userData) return <div>Please connect your wallet to view your dashboard.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Your Dashboard</h2>
      <p>Address: {userData.profile.stxAddress}</p>
      <h3 className="text-xl font-bold mt-8 mb-4">Your Markets</h3>
      <div className="space-y-4">
        {userMarkets.map((market) => (
          <div key={market.id} className="bg-purple-800 p-4 rounded shadow">
            <h4 className="font-bold">{market.question}</h4>
            <p>Status: {market.resolved ? 'Resolved' : 'Open'}</p>
            <p>Yes Amount: {market.yes_amount} STX</p>
            <p>No Amount: {market.no_amount} STX</p>
            {market.resolved && (
              <p>Outcome: {market.outcome}</p>
            )}
            {market.resolved && !market.reward_claimed && (
              <button
                onClick={() => handleClaimReward(market.id)}
                className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                Claim Reward
              </button>
            )}
            {market.resolved && market.reward_claimed && (
              <p className="mt-2 text-green-400">Reward Claimed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;

