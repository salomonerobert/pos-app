import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    stock: {
        type: Map,
        of: Number,
        required: true
    }
});

inventorySchema.index({ 'stock.$*': 1 });

export const Inventory = mongoose.model('Inventory', inventorySchema);
