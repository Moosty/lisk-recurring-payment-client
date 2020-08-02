import React, { useEffect, useState } from 'react';
import { Client } from "./Client";
import { Close } from "./components/Close";
import './App.less';

function App() {
  const [wallets, setWallets] = useState([{
    id: 0
  }]);

  useEffect(() => {
    if (wallets.length === 0) {
      setWallets([{id: 0}]);
    }
  }, [wallets]);

  return (
    <div className="App">
      <header className="App-header">
        {wallets.map(wallet => {
          return <div key={`client-${wallet.id}`} className={`Box`}>
            <Close
              id={wallet.id}
              close={(id) => setWallets([...wallets.filter(value => value.id !== id)])}/>
            <Client
                    id={wallet.id}
                    close={(id) => setWallets([...wallets.filter(value => value.id !== id)])}/>
          </div>
        })}
        {wallets.length < 4 &&
        <button onClick={() => setWallets([...wallets, {id: wallets[wallets.length - 1].id + 1}])}>+</button>}
      </header>
    </div>
  );
}

export default App;
