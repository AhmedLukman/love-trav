import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Successfully logged in");
      navigate("/app");
    },
    onError: (error) => toast.error(error.message),
  });

  return { login, isLoggingIn };
};
