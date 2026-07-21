// import { useState } from "react";

// import DashboardLayout from "../../components/DashboardLayout";

// export default function AdminEarnings() {
//   const users = JSON.parse(localStorage.getItem("users")) || [];

//   const [selectedUser, setSelectedUser] = useState("");

//   const [type, setType] = useState("profit");

//   const [amount, setAmount] = useState("");

//   const [action, setAction] = useState("add");

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!selectedUser || !amount) {
//       alert("Fill all fields");

//       return;
//     }

//     const updatedUsers = users.map((user) => {
//       if (user.id === Number(selectedUser)) {
//         let newProfit = user.profit || 0;

//         let newBonus = user.bonus || 0;

//         if (type === "profit") {
//           if (action === "add") {
//             newProfit += Number(amount);
//           } else {
//             newProfit -= Number(amount);
//           }
//         }

//         if (type === "bonus") {
//           if (action === "add") {
//             newBonus += Number(amount);
//           } else {
//             newBonus -= Number(amount);
//           }
//         }

//         return {
//           ...user,

//           profit: newProfit,

//           bonus: newBonus,
//         };
//       }

//       return user;
//     });

//     localStorage.setItem(
//       "users",

//       JSON.stringify(updatedUsers),
//     );

//     // Save earning history

//     const earnings = JSON.parse(localStorage.getItem("earnings")) || [];

//     earnings.push({
//       id: Date.now(),

//       userId: Number(selectedUser),

//       type,

//       action,

//       amount: Number(amount),

//       date: new Date().toLocaleString(),
//     });

//     localStorage.setItem(
//       "earnings",

//       JSON.stringify(earnings),
//     );

//     alert("Updated successfully");

//     setAmount("");
//   }

//   return (
//     <DashboardLayout>
//       <div className="transaction-form">
//         <form className="transaction-input" onSubmit={handleSubmit}>
//           <h2>Profit & Bonus Management</h2>

//           <select
//             value={selectedUser}
//             onChange={(e) => setSelectedUser(e.target.value)}
//             required
//           >
//             <option value="">Select User</option>

//             {users.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.name}
//               </option>
//             ))}
//           </select>

//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option value="profit">Profit</option>

//             <option value="bonus">Bonus</option>
//           </select>

//           <select value={action} onChange={(e) => setAction(e.target.value)}>
//             <option value="add">Add</option>

//             <option value="remove">Remove</option>
//           </select>

//           <input
//             type="number"
//             placeholder="Enter amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />

//           <button className="btn" type="submit">
//             Update
//           </button>
//         </form>
//       </div>
//     </DashboardLayout>
//   );
// }
