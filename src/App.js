import { BrowserRouter, Route, Routes } from "react-router-dom";
import DepartmentList from "./Pages/DepartmentsList";
import ProgramsList from "./Pages/ProgramsList";
import CoursesList from "./Pages/CoursesList";
import FacultiesList from "./Pages/FacultiesList ";
import AddCourses from "./Pages/AddCourses";
import AddDepartment from "./Pages/AddDepartment";
import AddFaculty from "./Pages/AddFaculty";
import AddProgram from "./Pages/AddProgram";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DepartmentList/>} />
        <Route path="/departments" element={<DepartmentList/>} />
        <Route path="/programs" element={<ProgramsList/>} />
        <Route path="/courses" element={<CoursesList/>} />
        <Route path="/faculties" element={<FacultiesList/>} />
        <Route path="/addcourse" element={<AddCourses/>} />
        <Route path="/adddepartment" element={<AddDepartment/>} />
        <Route path="/addfaculty" element={<AddFaculty/>} />
        <Route path="/addprogram" element={<AddProgram/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
