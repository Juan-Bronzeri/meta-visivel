import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// Importar o CSS do Ant Design
import 'antd/dist/reset.css'; // Importante para resetar estilos base
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
