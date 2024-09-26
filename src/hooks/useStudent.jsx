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

  const getLastResults = useCallback(async () => {
    try {
      const response = await customAxios.get(`/student/latest-result`);
      return response.data;
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
    }
  }, [showAlert]);

  const messageAdviser = useCallback(
    async (content, studentId) => {
      try {
        const response = await customAxios.post(
          `/api/messages/student/advisor/${studentId}`,
          { content }
        );
        return response.data;
      } catch (e) {
        showAlert(e?.response?.data?.message, {
          variant: "error",
        });
      }
    },
    [showAlert]
  );

  return { getStudentProfile, getLastResults, messageAdviser };
}

export { useStudent };
