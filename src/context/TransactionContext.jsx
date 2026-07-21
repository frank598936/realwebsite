import { createContext, useState } from "react";

export const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });

  function saveTransactions(data) {
    setTransactions(data);

    localStorage.setItem("transactions", JSON.stringify(data));
  }

  function addTransaction(transaction) {
    const updated = [...transactions, transaction];

    saveTransactions(updated);
  }

  function updateTransaction(id, status) {
    const updated = transactions.map((item) => {
      if (item.id === id) {
        return {
          ...item,

          status: status,
        };
      }

      return item;
    });

    saveTransactions(updated);
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,

        addTransaction,

        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
