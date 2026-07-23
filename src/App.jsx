import { Routes, Route } from "react-router-dom";

import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Policy from "./pages/Policy";

// USER

import Dashboard from "./pages/Users/Dashboard";
import Deposit from "./pages/Users/Deposit";
import Withdraw from "./pages/Users/Withdraw";
import Profile from "./pages/Users/Profile";

// ADMIN

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUser from "./pages/admin/AdminUsers";
import AdminDeposits from "./pages/admin/AdminDeposits";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About/>}/>

      <Route path="/policy" element={<Policy/>}/>

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      {/* USER ROUTES */}

      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/deposit"
        element={
          <ProtectedRoute role="user">
            <Deposit />
          </ProtectedRoute>
        }
      />

      <Route
        path="/withdraw"
        element={
          <ProtectedRoute role="user">
            <Withdraw />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute role="user">
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ADMIN ROUTES */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <AdminUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/deposits"
        element={
          <ProtectedRoute role="admin">
            <AdminDeposits />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/withdrawals"
        element={
          <ProtectedRoute role="admin">
            <AdminWithdrawals />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
