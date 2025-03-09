import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css'

import Home from './pages/Home.tsx';
import Welcome from './pages/Welcome.tsx';
import TakeQueue from './pages/TakeQueue.tsx';
import TakeQueuePeople from './pages/TakeQueuePeople.tsx';
import RetriveQueue from './pages/RetriveQueue.tsx';
import WaitingQueue from './pages/WaitingQueue.tsx';
import NotFound from './pages/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: "/welcome/:id",
    element: <Welcome />,
    errorElement: <NotFound />
  },
  {
    path: "/take-queue",
    element: <TakeQueue />
  },
  {
    path: "/take-queue-people",
    element: <TakeQueuePeople />
  },
  {
    path: "/retrive",
    element: <RetriveQueue />
  },
  {
    path: "/waiting",
    element: <WaitingQueue />
  },
  {
    path: "/not-found",
    element: <NotFound />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
