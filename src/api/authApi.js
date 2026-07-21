import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// SEND TOKEN AND USER ID AUTOMATICALLY

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const userData = localStorage.getItem("user");

  const user = userData ? JSON.parse(userData) : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (user) {
    config.headers.user_id = user.id;
  }

  return config;
});

// ===============================
// AUTH
// ===============================

export function registerUser(data) {
  return API.post("/auth/register", data);
}

export function loginUser(data) {
  return API.post("/auth/login", data);
}

// ===============================
// DEPOSITS
// ===============================

export function createDeposit(data) {
  return API.post("/deposits", data);
}

export function getUserDeposits(userId) {
  return API.get(`/deposits/${userId}`);
}

// ADMIN DEPOSITS

export function getAllDeposits() {
  return API.get("/deposits");
}

export function approveDeposit(id) {
  return API.put(`/deposits/approve/${id}`);
}

export function rejectDeposit(id) {
  return API.put(`/deposits/reject/${id}`);
}

// ===============================
// TRANSACTIONS
// ===============================

export function getUserTransactions(userId) {
  return API.get(`/transactions/${userId}`);
}

// ===============================
// WITHDRAWALS
// ===============================

export function createWithdrawal(data) {
  return API.post("/withdrawals", data);
}

export function getUserWithdrawals(userId) {
  return API.get(`/withdrawals/${userId}`);
}

// ADMIN WITHDRAWALS

export function getAllWithdrawals() {
  return API.get("/withdrawals");
}

export function approveWithdrawal(id) {
  return API.put(`/withdrawals/approve/${id}`);
}

export function rejectWithdrawal(id) {
  return API.put(`/withdrawals/reject/${id}`);
}

// ===============================
// USERS
// ===============================

export function getAllUsers() {
  return API.get("/users");
}

export function toggleBlockUser(id) {
  return API.put(`/users/block/${id}`);
}

export function updateUserProfitBonus(id, data) {
  return API.put(`/users/profit-bonus/${id}`, data);
}

export default API;
