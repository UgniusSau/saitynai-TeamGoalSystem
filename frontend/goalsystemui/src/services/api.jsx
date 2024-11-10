import instance from "./axios-client";
import authService from "./auth";
import toastService from "../services/toastService";

export async function login(user) {
  return await instance
    .post("auth/login", user)
    .then((res) => {
      console.log("log in res", res)
      const token = res.data;
      authService.setCookies(token);
      return { token };
    })
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function register(user) {
  try {
    const response = await instance.post("register", user);
    console.log(response.data);

    return response.data;
  } catch (error) {
    toastService.error(error.response.data);
    console.error("Error registering user:", error);
    throw error;
  } 
}

export async function renewToken() {
  return await instance
    .get("auth/accessToken")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function logOut() {
  return await instance
    .post("auth/logOut")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getTeamsList() {
  return await instance
    .get("Teams")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

// export async function createOrder(params) {
//   return await instance
//     .post("order", params)
//     .then((res) => res.data)
//     .catch((err) => {
//       toastService.error(err.response.data);
//     });
// }

// export async function updateOrder(params) {
//   return await instance
//     .put("order", params)
//     .then((res) => res.data)
//     .catch((err) => {
//       toastService.error(err.response.data);
//     });
// }

// export async function deleteOrder(id) {
//   return await instance
//     .delete(`order/${id}`)
//     .then((res) => res.data)
//     .catch((err) => {
//       toastService.error(err.response.data);
//     });
// }
