import { useContext, useState } from "react";

import DashboardLayout from "../../components/DashboardLayout";

import { AuthContext } from "../../context/AuthContext";

import { createWithdrawal } from "../../api/authApi";

import Notification from "../../components/Notification";

export default function Withdraw() {
  const { user } = useContext(AuthContext);

  const [type, setType] = useState("crypto");

  const [amount, setAmount] = useState("");

  const [method, setMethod] = useState("");

  const [address, setAddress] = useState("");

  const [accountName, setAccountName] = useState("");

  const [accountNumber, setAccountNumber] = useState("");

  const [bank, setBank] = useState("");

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

  async function handleWithdraw(e) {
    e.preventDefault();

    if (Number(amount) <= 0) {
      showNotification(
        "Enter a valid amount",

        "error",
      );

      return;
    }

    try {
      await createWithdrawal({
        user_id: user.id,

        amount: Number(amount),

        withdrawal_type: type,

        method: type === "crypto" ? method : "Bank Transfer",

        wallet_address: type === "crypto" ? address : "",

        bank_name: type === "bank" ? bank : "",

        account_name: type === "bank" ? accountName : "",

        account_number: type === "bank" ? accountNumber : "",
      });

      showNotification(
        "Withdrawal request submitted successfully",

        "success",
      );

      setAmount("");

      setMethod("");

      setAddress("");

      setAccountName("");

      setAccountNumber("");

      setBank("");
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Withdrawal request failed",

        "error",
      );
    }
  }

  return (
    <DashboardLayout>
      <Notification message={notification.message} type={notification.type} />

      <div className="transaction-form">
        <form className="transaction-input" onSubmit={handleWithdraw}>
          <h2>Withdraw Funds</h2>

          <div className="switch">
            <button
              type="button"
              className={type === "crypto" ? "btn active" : "btn"}
              onClick={() => setType("crypto")}
            >
              Crypto Wallet
            </button>

            <button
              type="button"
              className={type === "bank" ? "btn active" : "btn"}
              onClick={() => setType("bank")}
            >
              Bank Account
            </button>
          </div>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          {type === "crypto" && (
            <>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                required
              >
                <option value="">Select Crypto</option>

                <option value="Bitcoin">Bitcoin</option>

                <option value="Ethereum">Ethereum</option>

                <option value="USDT">USDT</option>

                <option value="Bitcoin Cash">Bitcoin Cash</option>
              </select>

              <input
                type="text"
                placeholder="Wallet Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </>
          )}

          {type === "bank" && (
            <>
              <input
                type="text"
                placeholder="Bank Name"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Account Name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit" className="btn">
            Submit Withdrawal
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
