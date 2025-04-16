import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true
    },
    title: { type: String, require: true },
    price: { type: Number, require: true },
    qty: { type: Number, require: true },
    imgSrc: { type: String, require: true },
    finalPrice: { type: Number }, // Add finalPrice to store discounted price
    discount: { type: Number, default: 0 } // Discount field (in percentage)
});

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    items: [cartItemSchema]
});

export const Cart = mongoose.model("Cart", cartSchema);
