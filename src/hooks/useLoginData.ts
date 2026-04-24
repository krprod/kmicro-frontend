import { useAppSelector } from "@/stores/store";
import {  shallowEqual } from "react-redux";
// import { type RootState } from "../redux-store/store";

interface loginData {
  loginEmail: string;
  loginUserRole?: number | null;
  loginPreviousRoute?: string | null;
  loginToken?: string | null;
  userName?: string | null;
}

const useLoginData = (): loginData => {
  const { loginEmail, loginToken } = useAppSelector(
    (state) => ({
      loginEmail: state?.auth?.user?.email ?? "",
      loginToken: state?.auth?.token,
    }),
    shallowEqual // Use shallowEqual for comparison
  );

  return {
    loginEmail,
    loginToken,
  };
};

export default useLoginData;
