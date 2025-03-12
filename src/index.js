import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await App());
};

app();
