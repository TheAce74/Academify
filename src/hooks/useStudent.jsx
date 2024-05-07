import { useCallback } from "react";
import { useStudentContext } from "../context/StudentContext";
import { customAxios } from "../services/axios";
import { useAlert } from "./useAlert";

function useStudent() {
  const { showAlert } = useAlert();
  const { setStudent } = useStudentContext();

  const getStudentProfile = useCallback(async () => {
    try {
      const response = await customAxios.get(`/student/profile`);
      setStudent(response.data);
      return response.data;
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
    }
  }, [showAlert, setStudent]);

  return { getStudentProfile };
}

export { useStudent };
