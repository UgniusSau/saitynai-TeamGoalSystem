import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getGoalsList,
  createGoal,
  updateGoal,
  removeGoal,
} from "../../services/api";
import toastService from "../../services/toastService";

export const useGoalsList = (teamId, memberId) => {
  return useQuery({
    queryKey: ["get-goals-list", teamId, memberId],
    queryFn: () => getGoalsList(teamId, memberId),
    enabled: !!teamId && !!memberId,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: 1,
  });
};

export const useCreateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teamId, memberId, goalData }) =>
      createGoal(teamId, memberId, goalData),
    onSuccess: () => {
      toastService.success("Goal created successfully!");
      queryClient.invalidateQueries(["get-goals-list"]);
    },
    retry: 1,
  });
};

export const useUpdateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teamId, memberId, goalId, goalData }) =>
      updateGoal(teamId, memberId, goalId, goalData),
    onSuccess: (e) => {
      if (e !== undefined) toastService.success("Goal updated successfully!");
      queryClient.invalidateQueries(["get-goals-list"]);
    },
    retry: 1,
  });
};

export const useRemoveGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teamId, memberId, goalId }) =>
      removeGoal(teamId, memberId, goalId),
    onSuccess: (e) => {
      if (e !== undefined) {
        if (e !== "") toastService.success(e);
        else toastService.success("Goal removed successfully!");
      }
      queryClient.invalidateQueries(["get-goals-list"]);
    },
    retry: 1,
  });
};
