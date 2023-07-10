import {
  useLocation,
  createBrowserRouter,
  RouterProvider,
  useOutlet,
  matchRoutes,
} from 'react-router-dom';
import About from './components/About/About';
import NoPage from './components/NoPage/NoPage';
import Bookmarks from './components/Bookmarks/Bookmarks';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Loading from './components/Loading/Loading';
import { createRef } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { DataProvider } from './DataProvider';
import Posts from './components/Blog/Posts';
import Post from './components/Blog/Post';
import Projects from './components/Projects/Projects';
import Resume from './components/Resume/Resume';

const routes = [
  {
    path: '/',
    name: 'aboutme',
    element: <About />,
    nodeRef: createRef(),
  },
  {
    path: '/projects',
    name: 'projects',
    element: <Projects />,
    nodeRef: createRef(),
  },
  {
    path: '/blog',
    name: 'blog',
    element: <Posts />,
    nodeRef: createRef(),
  },
  {
    path: '/blog/:slug',
    name: 'blog',
    element: <Post />,
    nodeRef: createRef(),
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    element: <Bookmarks />,
    nodeRef: createRef(),
  },
  {
    path: '/resume',
    name: 'resume',
    element: <Resume />,
    nodeRef: createRef(),
  },
  {
    path: '*',
    name: 'nopage',
    element: <NoPage />,
    nodeRef: createRef(),
  },
];

function AppRoutes() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const matchedRoute = matchRoutes(routes, location.pathname)?.[0];
  const { nodeRef, name } = matchedRoute?.route ?? {};

  return (
    <DataProvider pathName={name}>
      <Loading />
      <div
        className="dark:bg-dark"
        style={{ height: '100%', minHeight: '100vh' }}
      >
        <div className="container mx-auto">
          <Navbar />
          <SwitchTransition>
            <CSSTransition
              key={location.key}
              nodeRef={nodeRef}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              {(state) => (
                <div ref={nodeRef} className="page">
                  {currentOutlet}
                  <Footer />
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </DataProvider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRoutes />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
