import { useContext, useState } from "react";

import DashboardLayout from "../../components/DashboardLayout";

import { AuthContext } from "../../context/AuthContext";
import { TransactionContext } from "../../context/TransactionContext";

import { createDeposit } from "../../api/authApi";

import Notification from "../../components/Notification";

export default function Deposit() {
  const { user } = useContext(AuthContext);

  const { addTransaction } = useContext(TransactionContext);

  const [amount, setAmount] = useState("");

  const [method, setMethod] = useState("");

  const [walletAddress, setWalletAddress] = useState("");

  const [notification, setNotification] = useState({
    message: "",

    type: "",
  });

  const wallets = {
    Bitcoin: "bc1qxxxxxxxxxxxxxxxxxxxxxxxxxx",

    Ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",

    USDT: "TQxxxxxxxxxxxxxxxxxxxxxxxxxx",

    "Bitcoin Cash": "qqxxxxxxxxxxxxxxxxxxxxxxxxxx",
  };

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

  function handleMethod(e) {
    const crypto = e.target.value;

    setMethod(crypto);

    setWalletAddress(wallets[crypto] || "");
  }

  function copyAddress() {
    navigator.clipboard.writeText(walletAddress);

    showNotification(
      "Wallet address copied",

      "success",
    );
  }

  async function handleDeposit(e) {
    e.preventDefault();

    if (Number(amount) <= 0) {
      showNotification(
        "Enter a valid amount",

        "error",
      );

      return;
    }

    try {
      const depositData = {
        user_id: user.id,

        name: user.name,

        amount: Number(amount),

        method,

        wallet_address: walletAddress,
      };

      await createDeposit(depositData);

      addTransaction({
        id: Date.now(),

        userId: user.id,

        name: user.name,

        amount: Number(amount),

        method,

        wallet_address: walletAddress,

        type: "Deposit",

        status: "Pending",

        date: new Date().toLocaleDateString(),
      });

      showNotification(
        "Deposit submitted successfully",

        "success",
      );

      setAmount("");

      setMethod("");

      setWalletAddress("");
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Deposit failed",

        "error",
      );
    }
  }

  return (
    <DashboardLayout>
      <Notification message={notification.message} type={notification.type} />

      <div className="transaction-form">
        <form className="transaction-input" onSubmit={handleDeposit}>
          <h2>Make Deposit</h2>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <select value={method} onChange={handleMethod} required>
            <option value="">Select Crypto</option>

            <option value="Bitcoin">Bitcoin</option>

            <option value="Ethereum">Ethereum</option>

            <option value="USDT">USDT</option>

            <option value="Bitcoin Cash">Bitcoin Cash</option>
          </select>

          {walletAddress && (
            <div className="copy-address">
              <p>Send {method} to:</p>

              <span>{walletAddress}</span>

              <button type="button" className="btn" onClick={copyAddress}>
                Copy Address
              </button>
            </div>
          )}

          <button type="submit" className="btn">
            Deposit
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
