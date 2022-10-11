import './index.less';
import ReactDOM from 'react-dom/client';
// ref: https://github.com/remix-run/react-router/issues/8264#issuecomment-991271554
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import myHistory from '@/utils/history';
import AnimatedRoutes from './components/AnimatedRoutes';
import routes from './routes';
// import reportWebVitals from './reportWebVitals';

function App() {
  return (
    // <React.StrictMode>
    <HistoryRouter history={myHistory}>
      <AnimatedRoutes routes={routes} />
    </HistoryRouter>
    // </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
