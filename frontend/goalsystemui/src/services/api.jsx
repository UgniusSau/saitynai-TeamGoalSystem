import instance from "./axios-client";
import authService from "./auth";
import toastService from "../services/toastService";

export async function login(user) {
  return await instance
    .post("auth/login", user)
    .then((res) => {
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
    const response = await instance.post("auth/registerTeamLeader", user);
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

export async function getMembersList(teamId) {
  return await instance
    .get(`Teams/${teamId}/members`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function createMember(teamId, params) {
  return await instance
    .post(`Teams/${teamId}/members`, params)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function updateMember(teamId, memberId, params) {
  return await instance
    .patch(`Teams/${teamId}/members/${memberId}`, params)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function removeMember(teamId, memberId) {
  return await instance
    .delete(`Teams/${teamId}/members/${memberId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response.data);
    });
}

export async function getTeamsList() {
  return await instance
    .get("Teams")
    .then((res) => res.data)
    .catch((err) => {
      toastService.error("Error fetching teams list.");
      throw err;
    });
}

export async function createTeam(teamData) {
  return await instance
    .post("Teams", teamData)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response?.data || "Error creating team.");
    });
}

export async function updateTeam(teamId, teamData) {
  return await instance
    .patch(`Teams/${teamId}`, teamData)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response?.data || "Error updating team.");
    });
}

export async function removeTeam(teamId) {
  return await instance
    .delete(`Teams/${teamId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response?.data || "Error deleting team.");
    });
}

export async function getGoalsList(teamId, memberId) {
  return await instance
    .get(`Teams/${teamId}/Members/${memberId}/Goals`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error("Error fetching goals list.");
      throw err;
    });
}

export async function createGoal(teamId, memberId, goalData) {
  return await instance
    .post(`Teams/${teamId}/Members/${memberId}/Goals`, goalData)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response?.data || "Error creating goal.");
      throw err;
    });
}

export async function updateGoal(teamId, memberId, goalId, goalData) {
  return await instance
    .patch(`Teams/${teamId}/Members/${memberId}/Goals/${goalId}`, goalData)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response?.data || "Error updating goal.");
      throw err;
    });
}

export async function removeGoal(teamId, memberId, goalId) {
  return await instance
    .delete(`Teams/${teamId}/Members/${memberId}/Goals/${goalId}`)
    .then((res) => res.data)
    .catch((err) => {
      toastService.error(err.response?.data || "Error removing goal.");
      throw err;
    });
}
