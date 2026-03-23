import { RouterProvider } from 'react-router';
import { router } from './routes';
import { MenuProvider } from './context/MenuContext';

export default function App() {
  return (
    <MenuProvider>
      <RouterProvider router={router} />
    </MenuProvider>
  );
}
