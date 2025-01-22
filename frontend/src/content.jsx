import { createRoot } from 'react-dom/client'
import React, { StrictMode } from 'react';
import App from './App';
import "./index.css"

const root = document.createElement('div')
root.id = '__todo_uix'
document.body.append(root)
createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>
)
