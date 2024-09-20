import { FunctionComponent } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainPage from 'src/core/main-page';
import TatetiPage from 'src/core/tateti/page';
import Game2048 from 'src/core/game-2048';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/play/tateti',
    element: <TatetiPage />,
  },
  {
    path: '/play/2048',
    element: <Game2048 />,
  },
]);

const App: FunctionComponent = () => {
  return <RouterProvider router={router} />;
};

export default App;
