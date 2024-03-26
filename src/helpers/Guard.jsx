import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

function Guard({ children }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.name) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user.name]);

  if (user.name) {
    return <>{children}</>;
  }
}

export default Guard;
