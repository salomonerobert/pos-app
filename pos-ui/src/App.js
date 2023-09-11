import './App.css';
import Header from './components/Header';
import PointOfSale from './components/PointOfSales';
import { useState } from 'react';
import StockDashboard from './components/StockDashboard';

function App() {
  const [latestPurchase, setLatestPurchase] = useState({});

  return (
    <>
      <div className='main-container'>
        <Header />
        <PointOfSale setLatestPurchase={setLatestPurchase} />
      </div>
      <div className='stock-dashboard-container'>
        <StockDashboard latestPurchase={latestPurchase} />
      </div>
    </>
  );
}

export default App;
