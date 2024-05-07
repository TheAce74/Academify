import { useCallback } from "react";
import { useParentContext } from "../context/ParentContext";
import { customAxios } from "../services/axios";
import { useAlert } from "./useAlert";

function useParent() {
  const { showAlert } = useAlert();
  const { setParent } = useParentContext();

  const getParentProfile = useCallback(async () => {
    try {
      const response = await customAxios.get(`/parent/profile`);
      setParent(response.data);
      return response.data;
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
    }
  }, [showAlert, setParent]);

  return { getParentProfile };
}

export { useParent };
