import API from "./authApi";


export function getTransactions(userId){

  

  return API.get(`/transactions/${userId}`);

}