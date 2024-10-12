import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { register  } from 'swiper/element/bundle';

import { BrowserRouter } from "react-router-dom";
import './index.css'
register()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <App />
    </BrowserRouter>
  </StrictMode>,
)
