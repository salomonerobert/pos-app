import axios from "axios";
import React, { useEffect, useState } from "react";

const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

const InventoryCard = ({ item, quantity }) => {
  return (
    <div className="col-md-3 mb-4 px-2">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6 className="card-title font-weight-bold">{item}</h6>
              <p className="card-text text-muted">Quantity</p>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <h2 className="card-title m-0">{quantity}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function StockDashboard({ latestPurchase }) {
  const [stock, setStock] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/api/v1/pos/stock`)
      .then((res) => {
        setStock(res.data);
      })
      .catch((err) => console.log(err));
  }, [latestPurchase]);

  return (
    <div className="container mt-3">
      <h3>Inventory Dashboard</h3>
      <div className="row">
        {Object.entries(stock)?.length > 0 ? (
          Object.entries(stock).map(([key, value]) => (
            <InventoryCard key={key} item={key} quantity={value} />
          ))
        ) : (
          <h5>Failed to fetch stock data</h5>
        )}
      </div>
    </div>
  );
}

export default StockDashboard;
