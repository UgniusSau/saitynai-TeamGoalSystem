import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import {
  getTeamsList,
  updateTeam,
  createTeam,
  removeTeam,
} from "../../services/api";
import toastService from "../../services/toastService";
import { UserContext } from "../../services/authProvider";

export const useTeamsList = () => {
  const user = useContext(UserContext);

  return useQuery({
    enabled: user?.isLoggedIn,
    queryKey: ["get-teams-list"],
    queryFn: getTeamsList,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: 1,
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teamId, teamData }) => updateTeam(teamId, teamData),
    onSuccess: (e) => {
      if (e !== undefined) toastService.success("Team updated successfully!");
      queryClient.invalidateQueries(["get-teams-list"]);
    },
    retry: 1,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teamData) => createTeam(teamData),
    onSuccess: () => {
      toastService.success("Team created successfully!");
      queryClient.invalidateQueries(["get-teams-list"]);
    },
    retry: 1,
  });
};

export const useRemoveTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teamId) => removeTeam(teamId),
    onSuccess: (e) => {
      if (e !== undefined) {
        if (e !== "") toastService.success(e);
        else toastService.success("Team removed successfully!");
      }
      queryClient.invalidateQueries(["get-teams-list"]);
    },
    retry: 1,
  });
};
