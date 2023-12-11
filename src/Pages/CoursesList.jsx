import { useEffect, useState } from "react";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CoursesList() {

    const [getCourses, setGetCourses] = useState(false);
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setGetCourses(true);
    }, []);

    useEffect(() => {
        console.log(courses)
        console.log(courses.length)
    }, [courses]);

    const successCallback = (data) => {
        setGetCourses(false);
        console.log(data);
        setCourses(data?._embedded?.courses);
    }

    useFetch('GET', `/courses`, {}, successCallback, null, getCourses);

    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="card m-3">
                    <div className="card-body">
                        <div className="table-responsive">
                        { ( courses && courses.length ) ?
                                <table className="table text-grey">
                                    <thead className="fw-bold">
                                        <tr>
                                            <td>Courses</td>
                                            <td width="20%"><button className="btn btn-primary" title="add" onClick={() => {return 0;}}><i class="bi bi-plus-circle-fill"></i></button></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                        { courses.map((course) => { return <tr key={course.identity}><td>{course?.title}</td><td><button title="edit" className="btn btn-primary" onClick={() => {return 0;}}><i class="bi bi-pencil-square"></i></button></td></tr> }) }
                                    </tbody>
                                </table>
                            : null
                             }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}