import { Route, Routes } from "react-router-dom";
import Login from "containers/Login";
import Wallet from "containers/Wallet";
import AuthProvider from "components/AuthProvider/AuthProvider";
import ProtectedRoute from "components/ProtectedRoute";
import "./App.css";

function App() {
  return (
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
  );
}

export default App;
