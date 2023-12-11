import { BrowserRouter, Route, Routes } from "react-router-dom";
import DepartmentList from "./Pages/DepartmentsList";
import ProgramsList from "./Pages/ProgramsList";
import CoursesList from "./Pages/CoursesList";
import FacultiesList from "./Pages/FacultiesList ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DepartmentList/>} />
        <Route path="/departments" element={<DepartmentList/>} />
        <Route path="/programs" element={<ProgramsList/>} />
        <Route path="/courses" element={<CoursesList/>} />
        <Route path="/faculties" element={<FacultiesList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
