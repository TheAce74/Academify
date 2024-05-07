import { useNavigate } from "react-router-dom";
import { customAxios } from "../services/axios";
import { removeUser, setUser } from "../utils/auth";
import { useAlert } from "./useAlert";
import { useAuthContext } from "../context/AuthContext";

function useAuth() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { setUser: handleSetUser } = useAuthContext();

  const register = async (type, payload) => {
    const route = type === "adviser" ? "courseadvisor" : type;
    try {
      const response = await customAxios.post(`/register/${route}`, payload);
      setUser(response.data);
      const type =
        response.data.userType === "course_advisor"
          ? "adviser"
          : response.data.userType;
      handleSetUser({ type });
      showAlert("Registered successfully", {
        variant: "success",
      });
      navigate(`/${type}`);
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
    }
  };

  const login = async (type, payload) => {
    const route = type === "adviser" ? "courseadvisor" : type;
    try {
      const response = await customAxios.post(`/login/${route}`, payload);
      setUser(response.data);
      const type =
        response.data.userType === "course_advisor"
          ? "adviser"
          : response.data.userType;
      handleSetUser({ type });
      showAlert("Logged in successfully", {
        variant: "success",
      });
      navigate(`/${type}`);
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
    }
  };

  const logout = async () => {
    removeUser();
    handleSetUser({ type: "" });
  };

  return { register, login, logout };
}

export { useAuth };
