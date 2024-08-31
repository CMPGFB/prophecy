import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Connect, useConnect } from '@stacks/connect-react';
import ConnectWallet from './components/ConnectWallet';
import LandingPage from './components/LandingPage';
import CreateMarket from './components/CreateMarket';
import MarketList from './components/MarketList';
import MarketView from './components/MarketView';
import UserDashboard from './components/UserDashboard';

function App() {
  const { userSession } = useConnect();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, [userSession]);

  return (
    <Connect authOptions={{
      appDetails: {
        name: 'Prophecy DApp',
        icon: '/logo192.png',
      },
      redirectTo: '/',
      onFinish: () => {
        window.location.reload();
      },
    }}>
      <Router>
        <div className="App bg-purple-900 min-h-screen text-white">
          <nav className="bg-purple-800 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Prophecy DApp</h1>
            <ConnectWallet />
          </nav>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/create" render={(props) => <CreateMarket {...props} userData={userData} />} />
            <Route path="/markets" render={(props) => <MarketList {...props} userData={userData} />} />
            <Route path="/market/:id" render={(props) => <MarketView {...props} userData={userData} />} />
            <Route path="/dashboard" render={(props) => <UserDashboard {...props} userData={userData} />} />
          </Switch>
        </div>
      </Router>
    </Connect>
  );
}

export default App;