import mongoose from "mongoose";
import { Inventory } from "../models/Inventory.js";
import { Purchase } from "../models/Purchase.js";

export async function getInventory() {
    try {
        // Retrieve the inventory. Since there's only one inventory document, using findOne
        const inventoryDoc = await Inventory.findOne();

        if (!inventoryDoc) {
            return null;
        }

        return inventoryDoc.stock; 
    } catch (error) {
        console.error('Failed to retrieve inventory:', error.message);
        throw error; 
    }
}

export async function recordPurchaseAndUpdateStock(purchaseItems) {
    const session = await mongoose.startSession();
  
    try {
      // Start the transaction
      session.startTransaction();
  
      const purchase = new Purchase({
        items: purchaseItems
      });
      await purchase.save({ session });
  
      const updateQuery = {};
      for (let [item, details] of Object.entries(purchaseItems)) {
        updateQuery[`stock.${item}`] = -details.quantity;
      }
  
      await Inventory.findOneAndUpdate({}, { $inc: updateQuery }, { session });
  
      await session.commitTransaction();
      session.endSession();

      return true;
    } catch (error) {
      // If an error occurred, abort the entire transaction and roll back any changes
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }