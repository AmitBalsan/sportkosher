import { useMemo, useState, createContext } from "react";
import { parseJwt } from "../utils/token";

type UserData = {
  isLoggedIn: boolean;
  email: string;
  fullName: string;
};

type AuthContextType = {
  state: UserData;
  dispatch: (newUser: UserData) => void;
  logout?: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  state: { isLoggedIn: false, email: "", fullName: "" },
  dispatch: () => {},
  logout: () => {},
});

export function getUserDataFromToken(accessToken?: string | null) {
  console.log("1");
  if (!accessToken) {
    accessToken = window.localStorage.getItem("accessToken");
    console.log("2");
  }
  let email = "",
    fullName = "";
  console.log("3");
  if (typeof accessToken == "string" && accessToken != "undefined") {
    console.log("4");
    const userDetails = parseJwt(accessToken);
    email = userDetails.email;
    fullName = userDetails.fullName;
  }
  return { isLoggedIn: accessToken ? true : false, email, fullName };
}
// const AuthHelper = ({ children, logout }: any) => {
//   const accessToken = window.localStorage.getItem("accessToken");
//   const refreshToken = window.localStorage.getItem("refreshToken");
//   if (accessToken || refreshToken) {
//     logout();
//   }
//   return null;
// };

const AuthProvider = ({ children }: any) => {
  //   const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserData>({
    isLoggedIn: false,
    email: "",
    fullName: "",
  });

  const logOut = () => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    setUserDetails(getUserDataFromToken());
    window.location.pathname = "/";
  };

  const providerUserValue = useMemo(
    () => ({ state: userDetails, dispatch: setUserDetails, logout: logOut }),
    [userDetails, setUserDetails, logOut]
  );

  return (
    <AuthContext.Provider value={providerUserValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
