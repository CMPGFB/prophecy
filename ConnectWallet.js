import React from 'react';
import { useConnect } from '@stacks/connect-react';

function ConnectWallet() {
  const { authentication, userSession } = useConnect();

  const handleAuth = () => {
    if (userSession.isUserSignedIn()) {
      userSession.signUserOut();
      window.location.reload();
    } else {
      authentication.openAuthRequest();
    }
  };

  return (
    <button 
      onClick={handleAuth}
      className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-purple-100 transition-colors"
    >
      {userSession.isUserSignedIn() ? 'Disconnect' : 'Connect Wallet'}
    </button>
  );
}

export default ConnectWallet;