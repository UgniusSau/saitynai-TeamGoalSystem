import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMembersList,
  updateMember,
  createMember,
  removeMember,
} from "../../services/api";
import toastService from "../../services/toastService";

export const useMembersList = (id) => {
  return useQuery({
    queryKey: ["get-members-list", id],
    queryFn: () => getMembersList(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: 1,
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teamId, memberId, memberData }) =>
      updateMember(teamId, memberId, memberData),
    onSuccess: (e) => {
      if (e !== undefined) toastService.success("Member updated successfully!");
      queryClient.invalidateQueries(["get-members-list"]);
    },
    retry: 1,
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teamId, memberData }) => createMember(teamId, memberData),
    onSuccess: () => {
      toastService.success("Member created successfully!");
      queryClient.invalidateQueries(["get-members-list"]);
    },
    retry: 1,
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teamId, memberId }) => removeMember(teamId, memberId),
    onSuccess: (e) => {
      if (e !== undefined)
        if (e !== "") toastService.success(e);
        else toastService.success("Member removed successfully!");
      queryClient.invalidateQueries(["get-members-list"]);
    },
    retry: 1,
  });
};
