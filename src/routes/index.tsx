import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import Layout from "../layout";
import AuthGuard from "../guards/authGuard";
// components
import LoadingScreen from "../components/loading";
import GuestGuard from "../guards/guestGuard";

// ----------------------------------------------------------------------

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("/main")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: "",
      element: (
        <AuthGuard>
          <Layout />
        </AuthGuard>
      ),
      children: [
        {
          element: <Navigate to="main/products" replace />,
          index: true,
        },
        { path: "main/products", element: <Products /> },
        { path: "main/product/:id/detail", element: <ProductDetails /> },
        { path: "main/cart", element: <Cart /> },
        { path: "main/history", element: <History /> },
      ],
    },

    {
      path: "*",
      children: [
        { path: "404", element: <NotFound /> },
        {
          path: "*",
          element: <Navigate to="/404" replace />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}

const Login = Loadable(lazy(() => import("../pages/login")));
const Products = Loadable(lazy(() => import("../pages/products")));
const ProductDetails = Loadable(
  lazy(() => import("../pages/products/productDetails"))
);
const Cart = Loadable(lazy(() => import("../pages/cart")));
const History = Loadable(lazy(() => import("../pages/history")));

const NotFound = Loadable(lazy(() => import("../pages/404")));
