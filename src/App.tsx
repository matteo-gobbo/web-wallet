import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "app/store";
import Login from "containers/Login";
import Wallet from "containers/Wallet";
import AuthProvider from "components/AuthProvider/AuthProvider";
import ProtectedRoute from "components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Provider>
  );
}

export default App;
