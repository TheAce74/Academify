import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

function Guard({ children }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const activeUser = location.pathname.split("/")[1];

  useEffect(() => {
    if (!user.type) {
      navigate("/login", { replace: true });
    } else {
      navigate(`/${user.type}`);
    }
  }, [navigate, user.type]);

  if (user.type && activeUser === user.type) {
    return <>{children}</>;
  }
}

export default Guard;
