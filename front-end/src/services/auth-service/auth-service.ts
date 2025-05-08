import type { SignUpType } from "@sanchit247/serverless-validation/src";
import apiClient from "../../api";
import { useMutation } from "@tanstack/react-query";

interface IAuthUser {
  userDetails: SignUpType;
  isSignUpPage: boolean;
}

const onAuthUser = async ({ userDetails, isSignUpPage }: IAuthUser) => {
  const response = await apiClient.post(
    `/api/v1/user/${isSignUpPage ? "signup" : "signin"}`,
    userDetails
  );
  return response.data;
};

const useAuthUser = ({ isSignUpPage }: { isSignUpPage: boolean }) =>
  useMutation({
    mutationKey: ["signUpUser"],
    mutationFn: (userDetails: SignUpType) =>
      onAuthUser({ userDetails, isSignUpPage }),
  });

export default useAuthUser;
