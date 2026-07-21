import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { TransactionContext } from "../context/TransactionContext";

export default function DepositHistory() {
  const { user } = useContext(AuthContext);

  const { transactions } = useContext(TransactionContext);

  const deposits = transactions.filter(
    (item) => item.userId === user.id && item.type === "Deposit",
  );

  return (
    <div>
      <h2>Deposit History</h2>

      <table>
        <thead>
          <tr>
            <th>Amount</th>

            <th>Method</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {deposits.length === 0 ? (
            <tr>
              <td colSpan="3">No deposits found</td>
            </tr>
          ) : (
            deposits.map((item) => (
              <tr key={item.id}>
                <td>${Number(item.amount).toLocaleString()}</td>

                <td>{item.method}</td>

                <td>{item.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
