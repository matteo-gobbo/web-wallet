import Login from 'containers/Login';
import Wallet from 'containers/Wallet';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='login' element={<Login />}/>
      <Route path="wallet" element={<Wallet />}/>
    </Routes>
  );
}

export default App;
