import { createContext, useContext, useReducer } from "react";

const Authcontext = createContext(null);
const initialstate = {
  isAuthenticated: false,
  UserRole: null,
  user: null,
};
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        UserRole: action.payload.role,
        user: action.payload.user,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: true,
        UserRole: null,
        user: null,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialstate);
  return (
    <Authcontext.Provider value={{ authstate: state, dispatch }}>
      {children}
    </Authcontext.Provider>
  );
};
export const useAuth = () => useContext(Authcontext);
