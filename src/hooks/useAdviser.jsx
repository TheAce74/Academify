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

  const createSemester = async (semester, session, courses) => {
    try {
      const response = await customAxios.post(`/advisors/semesters`, {
        name: semester,
        session,
        courses,
      });
      showAlert("Created successfully");
      return response.data;
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
    }
  };

  const getSemesters = useCallback(async (year, semester) => {
    try {
      const response = await customAxios.get(`/advisors/semesters`, {
        params: {
          session: year,
          name: semester,
        },
      });
      return response.data;
    } catch (e) {
      console.log(e?.response?.data?.message);
    }
  }, []);

  const getResult = useCallback(async (semester, course) => {
    try {
      const response = await customAxios.get(`/advisors/view-results`, {
        params: {
          semester,
          course,
        },
      });
      return response.data;
    } catch (e) {
      console.log(e?.response?.data?.message);
    }
  }, []);

  const getStudents = useCallback(async () => {
    try {
      const response = await customAxios.get(`/advisors/students`);
      return response.data;
    } catch (e) {
      console.log(e?.response?.data?.message);
    }
  }, []);

  return {
    getAdviserProfile,
    createSemester,
    getSemesters,
    getResult,
    getStudents,
  };
}

export { useAdviser };
