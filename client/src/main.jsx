import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux'
import { appStore} from './react-redux/store/appStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // required CSS

const persistor = persistStore(appStore)

createRoot(document.getElementById("root")).render(

  <StrictMode>

    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>

        <App />

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />


      </PersistGate>
    </Provider>

  </StrictMode>
);


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
