import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { register  } from 'swiper/element/bundle';

import { BrowserRouter } from "react-router-dom";
import './index.css'
import { SearchQueryProvider } from './Consonant/SearchQuery.jsx';
import { EditProductProvider } from './ContextApi/EditProductContext.jsx';
register()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <SearchQueryProvider>
      <EditProductProvider>
      <App />
      </EditProductProvider>

    </SearchQueryProvider>
    </BrowserRouter>
  </StrictMode>,
)
