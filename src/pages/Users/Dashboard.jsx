import { useContext, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";

import DashboardLayout from "../../components/DashboardLayout";
import TransactionsTable from "./TransactionsTable";

import { AuthContext } from "../../context/AuthContext";
import { getDashboard } from "../../api/dashboardApi";
import MarketOverview from "../../components/MarketOverview";
import TradingViewTicker from "../../components/TradingViewTicker";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [dashboard, setDashboard] = useState({
    balance: 0,

    profit: 0,

    bonus: 0,

    totalDeposits: 0,

    totalWithdrawals: 0,

    pendingDeposits: 0,

    pendingWithdrawals: 0,
  });

  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      const response = await getDashboard(user.id);

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      loadDashboard();

      const interval = setInterval(() => {
        loadDashboard();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <DashboardLayout>
        <h2>Loading dashboard...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <section className="banner">
        <div className="welcome-banner">
          <h1>Welcome back, {user.name}</h1>

          <p>Manage your investment account</p>

          <Link to="/deposit" className="btn">
            Make Deposit
          </Link>
        </div>
      <TradingViewTicker/>
      </section>

      <section className="balance-cards">
        <div className="balance-card">
          <h3>Account Balance</h3>

          <p>${Number(dashboard.balance || 0).toLocaleString()}</p>
        </div>

        <div className="balance-card">
          <h3>Total Deposits</h3>

          <p>${Number(dashboard.totalDeposits || 0).toLocaleString()}</p>
        </div>

        <div className="balance-card">
          <h3>Total Withdrawals</h3>

          <p>${Number(dashboard.totalWithdrawals || 0).toLocaleString()}</p>
        </div>

        <div className="balance-card">
          <h3>Total Profit</h3>

          <p>${Number(dashboard.profit || 0).toLocaleString()}</p>
        </div>

        <div className="balance-card">
          <h3>Total Bonus</h3>

          <p>${Number(dashboard.bonus || 0).toLocaleString()}</p>
        </div>

        <div className="balance-card">
          <h3>Pending Deposits</h3>

          <p>{dashboard.pendingDeposits}</p>
        </div>

        <div className="balance-card">
          <h3>Pending Withdrawals</h3>

          <p>{dashboard.pendingWithdrawals}</p>
        </div>
      </section>

      <>
        <MarketOverview />
      </>

      <TransactionsTable />
    </DashboardLayout>
  );
}
