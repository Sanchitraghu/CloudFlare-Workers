import { Link } from "react-router-dom";
import useAuthController from "./auth-controller";
import type { ChangeEvent } from "react";
import Spinner from "../spinner";

interface IAuth {
  isSignUpPage: boolean;
}

const Auth = ({ isSignUpPage }: IAuth) => {
  const { inputFieldsArray, isUserLoading, onInputFieldsChange, onUserSubmit } =
    useAuthController({
      isSignUpPage,
    });

  return (
    <div className="grid grid-cols-1 h-screen lg:grid-cols-2">
      <div className=" flex flex-col items-center justify-center col-span-1 h-full">
        <div className="w-1/2">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              {isSignUpPage ? "Create an account" : "Sign In to your account"}
            </h2>
            <p>
              {isSignUpPage
                ? "Already have an account? "
                : "Don't have an account? "}
              <Link
                className="underline"
                to={isSignUpPage ? "/auth/signin" : "/auth/signup"}
              >
                {isSignUpPage ? " Sign In" : " Sign Up"}
              </Link>
            </p>
          </div>
          <div className="mt-10">
            {inputFieldsArray.map((inputField) => {
              return !isSignUpPage && inputField.type === "name" ? null : (
                <>
                  <label className="block mb-2 mt-4 text-sm font-medium text-gray-900">
                    {inputField.fieldsName}
                  </label>
                  <input
                    type={inputField.type}
                    id={inputField.fieldsName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onInputFieldsChange(inputField.type, e.target.value)
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    placeholder={inputField.placeholder}
                    required
                  />
                </>
              );
            })}
            <div>
              <button
                type="button"
                onClick={onUserSubmit}
                className="text-white w-full cursor-pointer mt-8 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                {isUserLoading ? (
                  <Spinner />
                ) : !isSignUpPage ? (
                  " Sign In"
                ) : (
                  " Sign Up"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden  flex-col justify-center items-center bg-slate-200 col-span-1 h-full lg:flex">
        <div className=" w-3/4 p-8">
          <p className="text-3xl font-bold">
            "The customer support I received was exceptional. The support team
            went above and beyond the address maximum."
          </p>
          <div className="text-start mt-6">
            <h2 className="text-md font-bold">Julies Amsterdam</h2>
            <p className="text-sm text-slate-500">CEO | Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
