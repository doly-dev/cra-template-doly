import './index.less';
import React from 'react';
import ReactDOM from 'react-dom/client';
// ref: https://github.com/remix-run/react-router/issues/8264#issuecomment-991271554
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import myHistory from '@/utils/history';
import AnimatedRoutes from './components/AnimatedRoutes';
import routes from './routes';
// import reportWebVitals from './reportWebVitals';

function App() {
  // animated routes
  return <AnimatedRoutes routes={routes} />

  // // or not animated routes
  // const elements = useRoutes(routes);
  // return elements;
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  // <React.StrictMode>
  <HistoryRouter history={myHistory}>
    <App />
  </HistoryRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
