import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Esto ahora será nuestro archivo de estilos globales
import App from './App';
// import reportWebVitals from './reportWebVitals'; // Si lo eliminaste, quita esta línea

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// Si eliminaste reportWebVitals.js, comenta o elimina también esta línea
// reportWebVitals();