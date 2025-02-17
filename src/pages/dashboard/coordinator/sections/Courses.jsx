/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useCoordinatorContext } from "../../../../context/CoordinatorContext";
import Button from "../../../../components/ui/Button";
import Select from "../../../../components/ui/Select";
import Table2 from "../../../../components/ui/Table2";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useCoordinator } from "../../../../hooks/useCoordinator";
import { useAlert } from "../../../../hooks/useAlert";
import Loader from "../../../../components/ui/Loader";

const Courses = () => {
  const { coordinator } = useCoordinatorContext();
  const { getCourses, addCourses, getCoordinatorProfile, deleteCourses } =
    useCoordinator();
  const { showAlert } = useAlert();
  const [course, setCourse] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingD, setLoadingD] = useState(false);

  const [coursesToDelete, setCoursesToDelete] = useState([]);

  const [level, setLevel] = useState(0);
  const [semester, setSemester] = useState(0);
  const [addedCourses, setAddedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const columns = [
    {
      key: "name",
      title: "Name",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "courseCode",
      title: "Course Code",
    },
  ];

  const updateCourse = (course) => {
    setCourse(course);
    const all = [...addedCourses];
    course && all.includes(course) ? null : all.push(course);
    setAddedCourses(all);
  };

  const fetchCourses = async () => {
    setCourse(0);
    setAddedCourses([]);
    const response = await getCourses(level, semester);
    console.log(response);
    setCourses(response);
  };

  const addCourse = async () => {
    console.log(addedCourses);
    setLoading(true);
    const response = await addCourses(
      coordinator?.profile?.roleID,
      addedCourses
    );
    if (response?.message) {
      if (response?.message == "Courses added successfully") {
        showAlert(response.message, {
          variant: "success",
        });
        getCoordinatorProfile();
        setLoading(false);
        setAddedCourses([]);
      } else {
        showAlert(response?.message, {
          variant: "error",
        });
        setLoading(false);
      }
    }
    console.log(response);
  };

  const proceedToDelete = async () => {
    setLoadingD(true);
    const response = await deleteCourses(
      coordinator?.profile?.roleID,
      coursesToDelete
    );
    console.log(response);
    if (response?.message) {
      if (response?.message == "Courses removed successfully") {
        showAlert(response.message, {
          variant: "success",
        });
        getCoordinatorProfile();
        setLoadingD(false);
        setCoursesToDelete([]);
      } else {
        showAlert(response?.message, {
          variant: "error",
        });
        setLoadingD(false);
      }
    }
    setLoadingD(false);
  };

  const goToLink = (value) => {
    // console.log(value);
    const all = [...coursesToDelete];
    if (all.includes(value?.courseCode)) {
      return;
    } else {
      all.push(value?.courseCode);
    }
    setCoursesToDelete(all);
  };

  useEffect(() => {
    if (level && semester) {
      fetchCourses();
    }
  }, [level, semester]);

  useEffect(() => {
    console.log(coordinator);
  }, []);

  useEffect(() => {
    coordinator?.profile?.courses.length > 0 ? setCourse(true) : null;
  }, [coordinator]);

  return (
    <div>
      <h1 className="font-bold text-xl mb-1">Courses</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-16">
        <div className="w-full lg:order-1">
          <h1 className="font-bold text-xl mb-1">Add Course</h1>
          <p>
            This screen helps you add/include courses that you're coordinating.
          </p>
        </div>
        <div className="mt-4">
          <div>
            <Select
              value={level}
              setValue={(e) => setLevel(e)}
              placeholder="Select Level"
              options={[100, 200, 300, 400, 500]}
            />
          </div>
          <div>
            <Select
              disabled={!level}
              value={semester}
              setValue={(e) => setSemester(e)}
              placeholder="Select Semester"
              options={["Harmattan", "Rain"]}
            />
          </div>
          <div>
            <Select
              disabled={!semester}
              value={course}
              setValue={(e) => updateCourse(e)}
              placeholder="Select Course"
              options={courses}
            />
          </div>
          {addedCourses.length > 0 && (
            <div className="flex flex-wrap gap-2 text-neutral-300 pb-2">
              {addedCourses.map((course) => (
                <span
                  key={course}
                  className="flex justify-center items-center border text-sm rounded-md py-2 px-3 gap-x-2"
                >
                  <CloseOutlinedIcon
                    className="cursor-pointer hover:text-primary-300 transition-colors"
                    onClick={() =>
                      setAddedCourses((prev) => [
                        ...prev.slice(0, prev.indexOf(course)),
                        ...prev.slice(prev.indexOf(course) + 1),
                      ])
                    }
                  />
                  <p>{course}</p>
                </span>
              ))}
            </div>
          )}

          <Button
            onClick={addCourse}
            disabled={addedCourses.length < 1}
            className="text-sm w-full mb-8"
          >
            {loading ? <Loader /> : "Add Course"}
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="font-bold text-xl mb-2">
          Delete {coursesToDelete.length > 1 ? "Courses" : "Course"}
        </h1>

        {coursesToDelete.length > 0 ? (
          <div className="flex flex-wrap gap-2 text-neutral-300 pb-2">
            {coursesToDelete.map((course) => (
              <span
                key={course}
                className="flex justify-center items-center border text-sm rounded-md py-2 px-3 gap-x-2"
              >
                <CloseOutlinedIcon
                  className="cursor-pointer hover:text-primary-300 transition-colors"
                  onClick={() =>
                    setCoursesToDelete((prev) => [
                      ...prev.slice(0, prev.indexOf(course)),
                      ...prev.slice(prev.indexOf(course) + 1),
                    ])
                  }
                />
                <p>{course}</p>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-slate-300 italic">
            Add Courses to be deleted
          </span>
        )}

        <Button
          onClick={proceedToDelete}
          disabled={coursesToDelete.length < 1}
          className="text-sm w-full mt-4"
        >
          {loadingD ? (
            <span className="flex items-center space-x-2">
              <Loader /> Deleting Courses
            </span>
          ) : (
            <span>Delete Course(s)</span>
          )}
        </Button>
      </div>

      <div>
        <p className="text-xl pb-2 font-bold">Added Courses</p>

        <div className="mt-5">
          <Table2
            data={coordinator?.profile?.courses?.map((course) => ({
              name: coordinator?.profile?.name,
              email: coordinator?.profile?.email,
              courseCode: course,
            }))}
            goToLink={goToLink}
            columns={columns}
            link="/adviser/semesters/view"
            action="Add To Delete"
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
