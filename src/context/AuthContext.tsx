import { createContext, useEffect, useReducer, ReactNode } from "react";
import axios from "../utils/axios";
import { setSession } from "../utils/jwt";

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
}

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

interface AuthAction {
  type: "INITIALIZE" | "LOGIN" | "LOGOUT" | "UPDATE_BALANCE";
  payload?: {
    isAuthenticated?: boolean;
    user?: User | null;
    balance?: number;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state: AuthState, action: AuthAction): AuthState => {
    const { isAuthenticated = false, user = null } = action.payload || {};
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: AuthState, action: AuthAction): AuthState => {
    const { user } = action.payload || {};

    return {
      ...state,
      isAuthenticated: true,
      user: user || null,
    };
  },
  LOGOUT: (state: AuthState): AuthState => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  UPDATE_BALANCE: (state: AuthState, action: AuthAction): AuthState => {
    // @ts-ignore
    const { balance } = action.payload;
    return {
      ...state,
      user: state.user ? { ...state.user, balance } : null,
    };
  },
};

const reducer = (state: AuthState, action: AuthAction): AuthState =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

interface AuthContextType extends AuthState {
  method: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updateBalance: () => {},
});

// ----------------------------------------------------------------------

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const userStorage = window.localStorage.getItem("@user");

        if (userStorage) {
          setSession(userStorage);

          const response = await axios.get("/users");
          const user = response.data.find(
            // @ts-ignore
            (user: any) => user.email === userStorage.email
          );

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.get("/users");
    const user = response.data.find(
      (user: any) => user.email === email && user.password === password
    );

    if (user) {
      setSession(user);
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } else {
      console.log("Invalid email or password");
    }
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const updateBalance = (newBalance: number) => {
    dispatch({
      type: "UPDATE_BALANCE",
      payload: {
        balance: newBalance,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        updateBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
