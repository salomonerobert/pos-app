import express from "express";
import {
  getInventory,
  recordPurchaseAndUpdateStock,
} from "../controllers/posController.js";
import { consolidatePurchases, validatePurchaseForInsert } from "../utils/validations.js";

const posRouter = express.Router();

// GET /stock
posRouter.get("/stock", async (req, res) => {
  try {
    const stock = await getInventory();
    res.status(200).json(stock);
  } catch (err) {
    console.error("Error getting stock: " + err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /purchase
posRouter.post("/purchase", async (req, res) => {
  try {
    if (!req.body.purchase) {
      res.status(400).json({ error: "Missing purchase object in request." });
      return;
    }

    const purchaseItems = consolidatePurchases(req.body.purchase)

    if (!validatePurchaseForInsert(purchaseItems)) {
      res.status(400).json({ error: "Purchase object validation failed." });
      return;
    }

    const isInsertSuccessful = recordPurchaseAndUpdateStock(purchaseItems);

    if (isInsertSuccessful) {
      res.status(200).json({success: true});
    } else {
      res.status(400).json({ error: `Failed to insert purchase into database` });
    }
  } catch (err) {
    console.error(`Error in inserting purchase into database: ${err.message}`);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default posRouter;
