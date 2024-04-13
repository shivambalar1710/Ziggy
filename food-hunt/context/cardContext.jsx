import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectValue, getValue] = useState([]);
    const [sort, setSort] = useState(false);
    const handleCategory = (e) => {
        getValue(e.target.value.toLowerCase());
    };
    const handleSort = (e) => {
        setSort(!sort);
    };
    console.log(cart);
    const addToCart = (food) => {
        const exist = cartItems.find((x) => x._id === food._id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x._id === food._id ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
            localStorage.setItem("foodCart", JSON.stringify(cartItems));
        } else {
            setCartItems([...cartItems, { ...food, qty: 1 }]);
            localStorage.setItem("foodCart", JSON.stringify(cartItems));
        }
    };

    const removeItem = (food) => {
        const exist = cartItems.find((x) => x._id === food._id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x._id !== food._id));
            localStorage.setItem("foodCart", JSON.stringify(cartItems));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x._id === food._id ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
            localStorage.setItem("foodCart", JSON.stringify(cartItems));
        }
    };


    useEffect(() => {
        const localCartData = localStorage.getItem("foodCart");
        console.log("Local storage data retrieved:", localCartData);
        if (localCartData) {
            setCart(JSON.parse(localCartData));
            console.log("Cart state updated:", JSON.parse(localCartData));
        }
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                sort,
                cart,
                handleSort,
                handleCategory,
                selectValue,
                addToCart,
                setCartItems,
                removeItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, useCartContext };