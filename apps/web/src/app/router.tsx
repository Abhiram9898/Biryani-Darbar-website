import { createBrowserRouter } from 'react-router-dom';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ErrorPage from '../pages/ErrorPage';
import Gallery from '../pages/Gallery';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Reviews from '../pages/Reviews';
import App from './shell';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'menu', element: <Menu /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'reviews', element: <Reviews /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);
