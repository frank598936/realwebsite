import { useContext } from "react";

import DashboardLayout from "../../components/DashboardLayout";

import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <DashboardLayout>
      <div className="profile-container">
        <div className="balance-cards">
          <div className="balance-card">
            <h3>Balance</h3>

            <h2>${(user?.balance || 0).toLocaleString()}</h2>
          </div>

          <div className="balance-card">
            <h3>Profit</h3>

            <h2>${(user?.profit || 0).toLocaleString()}</h2>
          </div>

          <div className="balance-card">
            <h3>Bonus</h3>

            <h2>${(user?.bonus || 0).toLocaleString()}</h2>
          </div>
        </div>

        <div className="transaction-input profile-details">
          <h2>Profile Information</h2>

          <div className="profile-row">
            <strong>Name:</strong>

            <span>{user?.name}</span>
          </div>

          <div className="profile-row">
            <strong>Email:</strong>

            <span>{user?.email}</span>
          </div>

          <div className="profile-row">
            <strong>Phone:</strong>

            <span>{user?.phone || "Not added"}</span>
          </div>

          <div className="profile-row">
            <strong>Country:</strong>

            <span>{user?.country || "Not added"}</span>
          </div>

          <div className="profile-row">
            <strong>Account Status:</strong>

            <span>{user?.blocked ? "Blocked" : "Active"}</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
