import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    items: {
        type: Map,
        of: {
            quantity: Number,
            value: Number
        },
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

purchaseSchema.index({ timestamp: 1 });

export const Purchase = mongoose.model('Purchase', purchaseSchema);