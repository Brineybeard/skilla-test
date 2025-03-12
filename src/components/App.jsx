import { Provider } from 'react-redux';

import Calls from './calls/Calls';
import store from '../slices/index.js';

const App = () => {
  return (
    <Provider store={store}>
      <Calls />
    </Provider>
  );
};

export default App;
