import axios from "axios";
import React, { useState } from "react";

const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

const PointOfSale = ({ setLatestPurchase }) => {
  const validFruits = ["Apple", "Banana", "Pear", "Orange"]; //typically we would fetch the list of items from the backend, hardcoding for simplicity to limit scope

  const prices = { //typically we would fetch the list of items from the backend, hardcoding for simplicity to limit scope
    Apple: 2.0,
    Banana: 1.5,
    Pear: 2.3,
    Orange: 1.8,
  };

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [entries, setEntries] = useState([]);

  const handleAddEntry = () => {
    if (
      validFruits.includes(item) &&
      Number.isInteger(Number(quantity)) &&
      quantity > 0
    ) {
      const entryValue = prices[item] * quantity;
      setEntries([...entries, { item, quantity, value: entryValue }]);
      setItem("");
      setQuantity("");
    } else {
      alert("Invalid entry. Please check the item name or quantity.");
    }
  };

  const handleSubmitTransaction = () => {
    const apiEndpoint = `${baseURL}/api/v1/pos/purchase`;
    
    axios.post(apiEndpoint, {"purchase": entries})
    .then(res => {
        if (res.status === 200) {
            alert("Transaction submitted successfully!");
            setEntries([]); // Clear the list after successful submission
            setLatestPurchase({'purchase': entries}) // Update latest transaction for inventory dashboard refresh
        } else {
            alert('Error submitting transactions - please try again later')
            console.error(`Error occurred while submitting transactions: ${res.data?.error}`)
        }
    })
    .catch(err => {
        console.error(`Error occurred while submitting transactions: ${err}`)
    })
  };

  const handleRemoveEntry = (index) => {
    const updatedEntries = entries.filter(
      (e, idx) => idx !== index
    );
    setEntries(updatedEntries);
  }

  return (
    <div className="container mt-2">
    {/* Form for inputting Item and Quantity */}
      <form className="mb-3">
        <div className="form-group mb-2">
          <label>Item:</label>
          <input
            type="text"
            className="form-control"
            list="fruitOptions"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <datalist id="fruitOptions">
            {validFruits.map((fruit) => (
              <option key={fruit} value={fruit} />
            ))}
          </datalist>
        </div>
        <div className="form-group mb-2">
          <label>Quantity:</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mr-2"
          onClick={handleAddEntry}
        >
          Add Entry
        </button>
      </form>
    {/* Display List of entries */}  
      <h4>Entries:</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Items</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.item}</td>
              <td>{entry.quantity}</td>
              <td>${entry.value?.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveEntry(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="text-right">
        Total: $
        {entries
          .reduce((acc, elem) => {
            return acc + elem.value;
          }, 0)
          ?.toFixed(2)}
      </h4>
      <button
        type="button"
        className="btn btn-success mt-2"
        onClick={handleSubmitTransaction}
      >
        Submit Transaction
      </button>
    </div>
  );
};

export default PointOfSale;
