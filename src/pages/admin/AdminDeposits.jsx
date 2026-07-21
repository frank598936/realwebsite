import { useEffect, useState } from "react";

import DashboardLayout from "../../components/DashboardLayout";

import {
  getAllDeposits,
  approveDeposit,
  rejectDeposit,
} from "../../api/authApi";

import Notification from "../../components/Notification";

export default function AdminDeposits() {
  const [deposits, setDeposits] = useState([]);

  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState({
    message: "",

    type: "",
  });

  function showNotification(message, type) {
    setNotification({
      message,

      type,
    });

    setTimeout(() => {
      setNotification({
        message: "",

        type: "",
      });
    }, 3000);
  }

  async function loadDeposits() {
    try {
      const response = await getAllDeposits();

      setDeposits(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDeposits();
  }, []);

  async function handleApprove(id) {
    try {
      await approveDeposit(id);

      showNotification(
        "Deposit approved successfully",

        "success",
      );

      loadDeposits();
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Approval failed",

        "error",
      );
    }
  }

  async function handleReject(id) {
    try {
      await rejectDeposit(id);

      showNotification(
        "Deposit rejected successfully",

        "success",
      );

      loadDeposits();
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Reject failed",

        "error",
      );
    }
  }

  return (
    <DashboardLayout>
      <Notification message={notification.message} type={notification.type} />

      <section className="dashboard-section">
        <h2>Deposit Requests</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>

                <th>User</th>

                <th>Amount</th>

                <th>Method</th>

                <th>Status</th>

                <th>Date</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : deposits.length === 0 ? (
                <tr>
                  <td colSpan="7">No deposits found</td>
                </tr>
              ) : (
                deposits.map((deposit) => (
                  <tr key={deposit.id}>
                    <td>{deposit.id}</td>

                    <td>{deposit.name}</td>

                    <td>${Number(deposit.amount).toLocaleString()}</td>

                    <td>{deposit.method}</td>

                    <td>{deposit.status}</td>

                    <td>{new Date(deposit.created_at).toLocaleDateString()}</td>

                    <td>
                      {deposit.status === "Pending" && (
                        <>
                          <button
                            className="approve-btn"
                            onClick={() => handleApprove(deposit.id)}
                          >
                            Approve
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() => handleReject(deposit.id)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}
