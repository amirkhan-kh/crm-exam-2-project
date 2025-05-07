import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/main-router.tsx'
import { Provider } from 'react-redux'
import { createContext } from 'react';
export const modalStore = createContext(null);
import './index.css'
import { store } from './store/store-config';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
)
