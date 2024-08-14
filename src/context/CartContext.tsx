import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";

interface Product {
  id: string;
  name: string;
  cover: string;
  points: number;
}

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  cart: Product[];
  addProduct: (product: Product) => Promise<void>;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@store:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (product: Product) => {
    try {
      const findProduct = cart.find((itemCart) => itemCart.id === product.id);

      if (findProduct) {
        setCart([...cart]);

        localStorage.setItem("@store:cart", JSON.stringify([...cart]));
        return;
      }

      const productInCart = {
        ...product,
        amount: 1,
      };

      localStorage.setItem(
        "@store:cart",
        JSON.stringify([...cart, productInCart])
      );

      setCart([...cart, productInCart]);
    } catch (err: any) {
      const regexp = /404/gm;

      if (regexp.test(err.message)) {
        toast.error("Erro na adição do produto");
        return;
      }

      toast.error(`${err.message}`);
    }
  };

  const removeProduct = async (productId: string) => {
    try {
      const productToRemove = cart.find(
        (itemCart) => itemCart.id === productId
      );

      if (!productToRemove) {
        throw new Error("Erro na remoção do produto");
      }

      const newCart = cart.filter((itemCart) => itemCart.id !== productId);

      localStorage.setItem("@store:cart", JSON.stringify(newCart));
      setCart(newCart);
    } catch (err: any) {
      const regexp = /404/gm;

      if (regexp.test(err.message)) {
        toast.error("Erro na remoção do produto");
        return;
      }
      toast.error(`${err.message}`);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
