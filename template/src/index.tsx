import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from '@/components/Router';
import routes from './routes';
// import reportWebVitals from './reportWebVitals';

function App() {
  return (
    <Router
      routes={routes}
      noMatchPath="/404"
      onRouteChange={(route) => {
        if (route && route.name) {
          document.title = route.name;
        }
      }}
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
