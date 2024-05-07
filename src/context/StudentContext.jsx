import { createContext, useContext, useState } from "react";

const StudentContext = createContext(null);

function StudentContextProvider({ children }) {
  const [student, setStudent] = useState({});

  const value = {
    student,
    setStudent,
  };
  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
}

export function useStudentContext() {
  return useContext(StudentContext);
}

export default StudentContextProvider;
