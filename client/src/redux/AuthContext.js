import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const persisrootUser = JSON.parse(localStorage.getItem("persist:root"))?.user;
const user = persisrootUser && JSON.parse(persisrootUser).currentUser;
console.log("userrrr",user)
const INITIAL_STATE = {
  user: user,
  // let user = currentUser?.accessToken;
  // user: JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser || null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};