import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, editUser, deleteUser } from "../services/api";
import { useContext } from "react";
import { UserContext } from "../services/authProvider";
import { useNavigate } from "react-router";
import toastService from "../services/toastService";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["get-user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retry: 1,
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUser,
    onSuccess: (e) => {
      if (e !== undefined)
        toastService.success("Paskyra sėkmingai atnaujinta!");
      queryClient.invalidateQueries(["get-user"]);
    },
    retry: 1,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (e) => {
      if (e !== undefined) toastService.success("Paskyra sėkmingai pašalinta!");
      queryClient.invalidateQueries(["get-user"]);
      userContext.logout();
      navigate("/");
    },
    retry: 1,
  });
};
