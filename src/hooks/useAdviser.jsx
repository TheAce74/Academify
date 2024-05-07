import { useCallback } from "react";
import { useAdviserContext } from "../context/AdviserContext";
import { customAxios } from "../services/axios";
import { useAlert } from "./useAlert";

function useAdviser() {
  const { showAlert } = useAlert();
  const { setAdviser } = useAdviserContext();

  const getAdviserProfile = useCallback(async () => {
    try {
      const response = await customAxios.get(`/profile/advisors`);
      setAdviser(response.data);
      return response.data;
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
    }
  }, [setAdviser, showAlert]);

  return { getAdviserProfile };
}

export { useAdviser };
