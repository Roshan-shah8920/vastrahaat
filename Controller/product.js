import { Product } from "../Model/Product.js";

// ➕ Add Product
export const addProduct = async (req, res) => {
  const { title, description, price, discount, category,gender, qty, imgSrc } = req.body;
  try {
    const product = await Product.create({
      title,
      description,
      price,
      discount, 
      category,
      gender,
      qty,
      imgSrc,
    });
    res.json({ message: "Product added successfully...!", product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// 📦 Get All Products
export const getProduct = async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 }); // 🔁 fixed "created" to "createdAt"
    res.json({ message: "All Products fetched successfully", product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// 🔍 Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) return res.json({ message: "Invalid Id" });
    res.json({ message: "Specific product found", product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// ✏️ Update Product by ID
export const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.json({ message: "Invalid Id" });
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// ❌ Delete Product by ID
export const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.json({ message: "Invalid Id" });
    res.json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.json({ error: error.message });
  }
};
