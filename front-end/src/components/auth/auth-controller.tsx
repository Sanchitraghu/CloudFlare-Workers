import { useEffect, useMemo, useState } from "react";
import type { SignUpType } from "@sanchit247/serverless-validation/src";
import Cookies from "js-cookie";
import openNotification from "../open-notification";
import { useAuthUser } from "../../services";
import { useNavigate } from "react-router-dom";

const useAuthController = ({ isSignUpPage }: { isSignUpPage: boolean }) => {
  const [inputFields, setInputFields] = useState<SignUpType>({
    email: "",
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const authUser = useAuthUser({ isSignUpPage });

  const onInputFieldsChange = (key: string, value: string) => {
    setInputFields({ ...inputFields, [key]: value });
  };

  const onUserSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputFields?.name?.length === 0 && isSignUpPage) {
      openNotification("Enter your name", "error");
    } else if (!emailRegex.test(inputFields.email)) {
      openNotification("Enter valid email", "error");
    } else if (inputFields.password.length < 6) {
      openNotification("Password length should be greater than 6", "error");
    } else {
      authUser.mutate(inputFields);
    }
  };

  const inputFieldsArray = useMemo(() => {
    return [
      {
        fieldsName: "Full Name",
        type: "name",
        placeholder: "Enter your username",
      },
      {
        fieldsName: "Email",
        type: "email",
        placeholder: "Enter your valid email",
      },
      {
        fieldsName: "Password",
        type: "password",
        placeholder: "Enter your password",
      },
    ];
  }, []);

  useEffect(() => {
    if (authUser.isSuccess && authUser.data?.jwt) {
      Cookies.set("token", authUser.data.jwt);
      navigate("/blogs");
    }
  }, [authUser.data, authUser.isSuccess]);

  useEffect(() => {
    if (authUser.isError) {
      // @ts-ignore
      openNotification(authUser.error.response.data.message, "error");
    }
  }, [authUser.isError]);

  return {
    inputFieldsArray,
    inputFields,
    isUserLoading: authUser.isPending,
    onInputFieldsChange,
    onUserSubmit,
  };
};

export default useAuthController;
