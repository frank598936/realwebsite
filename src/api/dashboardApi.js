import API from "./authApi";


export function getDashboard(userId){

    return API.get(
        `/dashboard/${userId}`
    );

}