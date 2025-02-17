import { useCallback } from "react";
import { useCoordinatorContext } from "../context/CoordinatorContext";
import { customAxios } from "../services/axios";
import { useAlert } from "./useAlert";

function useCoordinator() {
  const { showAlert } = useAlert();
  const { setCoordinator } = useCoordinatorContext();

  const getCoordinatorProfile = useCallback(async () => {
    try {
      const response = await customAxios.get(`/profile/coordinators`);
      setCoordinator(response.data);
      return response.data;
    } catch (e) {
      showAlert(e?.response?.data?.message, {
        variant: "error",
      });
    }
  }, [showAlert]);

  const getCourses = useCallback(async (level, semester) => {
    try {
      const { data } = await customAxios.get(
        `/courses/${level}/${semester.toLowerCase()}`
      );
      // console.log(data?.courses);
      const mainData = data?.courses.map((course) => {
        return `${course?.code}`;
      });
      return mainData;
    } catch (e) {
      console.error(e);
    }
  }, []);

  const addCourses = useCallback(async (coordinatorId, courseCodes) => {
    console.log(coordinatorId);
    try {
      const { data } = await customAxios.post(`/coordinators/add-courses`, {
        // coordinatorId,
        courseCodes,
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  }, []);

  const deleteCourses = useCallback(async (coordinatorId, courseIds) => {
    console.log(coordinatorId);

    try {
      const { data } = await customAxios.post(`/coordinators/remove-courses`, {
        // coordinatorId,
        courseCodes: [...courseIds],
      });
      return data;
    } catch (e) {
      console.error(e);
    }
  }, []);

  return { getCoordinatorProfile, getCourses, addCourses, deleteCourses };
}

export { useCoordinator };
