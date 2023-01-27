import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/authContext";
import { useContext } from "react";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import CartPage from "./pages/CartPage/CartPage";
import { CartProvider } from "./context/cartContext";

function App() {
  function Private({ children }) {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to='/' />;
    }

    return children;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/carrinho' element={<CartPage />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route path='/cadastrar' element={<SignUpPage />} />
            <Route path='/login' element={<SignInPage />} />
            <Route path='/cadastro-produto' element={<AddProductPage />} />
            <Route
              path='/pagamento'
              element={
                <Private>
                  <CartPage />
                </Private>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
