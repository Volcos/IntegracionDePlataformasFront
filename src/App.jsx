import React, { useState } from 'react'; // Importa useState
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importa Navigate
import './App.css';

// Importa los componentes de layout
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Importa las páginas de cliente
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import ProductsPage from './pages/Products/ProductsPage';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';

// Importa las nuevas páginas de bodeguero
import WarehouseLoginPage from './pages/WarehouseLogin/WarehouseLoginPage';
import WarehouseInventoryPage from './pages/WarehouseInventory/WarehouseInventoryPage';
import PaymentSuccess from './pages/PaymentSuccess/paymentSuccessPage';
import RetornoWebpay from './pages/RetornoWebPay/RetornoWebpay';
function App() {
  // Estado para simular si el bodeguero está logueado
  const [isWarehouseLoggedIn, setIsWarehouseLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        {/* El Header y Footer pueden ser condicionales si no los quieres en las vistas de bodeguero,
            pero por ahora los mantenemos para mantener la estética. */}
        <Header />
        <main>
          <Routes>
            {/* Rutas para el Frontend de Clientes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path='/paymentSuccess' element={<PaymentSuccess/>}/>
            <Route path="/retorno-webpay" element={<RetornoWebpay />} />
            {/* Rutas para el Frontend de Bodegueros */}
            <Route
              path="/warehouse/login"
              element={<WarehouseLoginPage setIsWarehouseLoggedIn={setIsWarehouseLoggedIn} />}
            />
            <Route
              path="/warehouse/inventory"
              element={
                isWarehouseLoggedIn ? (
                  <WarehouseInventoryPage />
                ) : (
                  <Navigate to="/warehouse/login" replace /> // Redirige si no está logueado
                )
              }
            />

            {/* Ruta por defecto para 404 (opcional) */}
            <Route path="*" element={<h1>404: Página no encontrada</h1>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;