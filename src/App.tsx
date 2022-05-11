import { Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "app/store";
import Login from "containers/Login";
import Wallet from "containers/Wallet";
import ProtectedRoute from "components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
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
        <Route path="*" element={<Navigate to="/wallet" replace />} />
      </Routes>
    </Provider>
  );
}

export default App;
