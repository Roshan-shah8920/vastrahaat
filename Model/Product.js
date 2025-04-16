import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  category: { type: String, required: true },
  gender: { type: String, required: true }, 
  qty: { type: Number, required: true },
  imgSrc: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 👇 Final price without decimal
productSchema.virtual("finalPrice").get(function () {
  return Math.round(this.price - (this.price * this.discount) / 100);
});

// 👇 Just return the original price (whole number)
productSchema.virtual("originalPrice").get(function () {
  return Math.round(this.price);
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export const Product = mongoose.model("Product", productSchema);
