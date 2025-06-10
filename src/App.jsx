import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importa los componentes de layout
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Importa las páginas
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/LoginPage'; // Importa la nueva página de Login
import RegisterPage from './pages/Register/RegisterPage';

function App() {
  return (
    <Router> {/* Envuelve toda la aplicación con Router */}
      <div className="App">
        <Header />
        <main>
          <Routes> {/* Define tus rutas aquí */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} /> {/* Nueva ruta para la página de login */}
            <Route path="/register" element={<RegisterPage />} />
            {/* Agrega más rutas aquí para futuras páginas (ej. /products, /about, /contact) */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;