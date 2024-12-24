import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const handleCloseError = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  const loginAction = async ({
    username,
    password,
  }) => {
    try {
      setIsLoading(true);
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const res = await response.json();
      if (res.token !== undefined) {
        setIsLoading(false);
        setUser(username);
        setToken(res.token);
        localStorage.setItem("user", username);
        localStorage.setItem("token", res.token);
        navigate("/");
        return;
      }
      setError(true);
      setIsLoading(false);
      throw new Error(res.message);
    } catch (err) {
      setError(true);
      setIsLoading(false);
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ token, user, isLoading, error, loginAction, logOut, handleCloseError }}>
      {children}
    </AuthContext.Provider>);
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};