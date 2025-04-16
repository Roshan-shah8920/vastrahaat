import { Cart } from "../Model/Cart.js";

// Add to cart
export const addToCart = async (req, res) => {
    const { productId, title, price, qty, imgSrc, discount } = req.body;

    const userId = req.user;    

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
    );

    let finalPrice = price;
    if (discount > 0) {
        finalPrice = price - (price * discount / 100);  // Apply discount
    }

    if (itemIndex > -1) {
        cart.items[itemIndex].qty += qty;
        cart.items[itemIndex].price += price * qty;
        cart.items[itemIndex].finalPrice = finalPrice;  // Update finalPrice
    } else {
        cart.items.push({ productId, title, price, qty, imgSrc, finalPrice });
    }

    try {
        await cart.save();
        res.json({ message: "Cart Successfully Added!", cart });
    } catch (error) {
        console.error("Error saving cart: ", error);
        res.status(500).json({ message: "Failed to add item to cart" });
    }
};

// User specific cart
export const userCart = async (req, res) => {
    const userId = req.user;
    const cart = await Cart.find({ userId });
    if (!cart) {
        return res.json({ message: "Cart not found" });
    }
    res.json({ message: "User cart", cart });
};

// Remove product from cart
export const removeProductFromCart = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return res.json({ message: "Cart Not Found" });
    }
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();
    res.json({ message: "Product removed successfully!", cart });
};

// Clear all products from cart
export const clearCart = async (req, res) => {
    const userId = req.user;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ items: [] });
    } else {
        cart.items = [];
    }
    await cart.save();
    res.json({ message: "Cart cleared!" });
};

// Decrease product quantity in cart
export const decreaseProductQty = async (req, res) => {
    const { productId, qty } = req.body;
    const userId = req.user;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
        const item = cart.items[itemIndex];
        if (item.qty > qty) {
            const pricePerUnit = item.price / item.qty;
            item.qty -= qty;
            item.price -= pricePerUnit * qty; // Adjust the price based on the decreased quantity
            item.finalPrice -= pricePerUnit * qty; // Adjust the final price accordingly
        } else {
            cart.items.splice(itemIndex, 1);
        }
    } else {
        return res.json({ message: "Invalid Product" });
    }
    await cart.save();
    res.json({ message: "Item removed successfully!", cart });
};
