import { useEffect, useState } from "react";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CoursesList() {

    // FOR FETCHING COURSE DATA
    const [getCourses, setGetCourses] = useState(false);
    const [courses, setCourses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setGetCourses(true);
    }, []);

    const successCallback = (data) => {
        setGetCourses(false);
        setCourses(data?._embedded?.courses);
    }

    const toAddCourse = () => {
        navigate('/addcourse');
    }

    useFetch('GET', `/courses`, {}, successCallback, null, getCourses);
    // END FOR FETCHING COURSE DATA

    // FOR UPDATING COURSE DATA
    const [selectedCourse, setSelectedCourse] = useState({
        title: "",
        description: ""
    });  // Track the selected course

    const openModal = (course) => {
        setSelectedCourse(course);
        // Open the modal
        const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    }

    const [updateCourse, setUpdateCourse] = useState(false);

    const successCallbackUpdate = (data) => {
        setUpdateCourse(false);
        setGetCourses(true);
    };

    const handleChangeInput = (e) => {
        setSelectedCourse({ ...selectedCourse, [e.target.name]: e.target.value })
    }

    const handleUpdateCourse = (e) => {
        e.preventDefault();
        setUpdateCourse(true);
    };

    useFetch('PUT', `/courses/${selectedCourse?.identity}`, selectedCourse, successCallbackUpdate, null, updateCourse);

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="card m-3">
                    <div className="card-body">
                        <div className="table-responsive">
                            {(courses && courses.length) ?
                                <table className="table text-grey">
                                    <thead className="fw-bold">
                                        <tr>
                                            <td>Courses</td>
                                            <td width="20%"><button className="btn btn-primary btn-sm" title="add" onClick={toAddCourse}><i className="bi bi-plus-circle-fill"></i></button></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.map((course) => (
                                            <tr key={course.identity}>
                                                <td>{course?.title}</td>
                                                <td>
                                                    <button title="edit" className="btn btn-primary btn-sm" onClick={() => openModal(course)}>
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Course</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdateCourse}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={selectedCourse?.title || ''}
                                        
                                        onChange={handleChangeInput}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={selectedCourse?.description || ''}
                                        onChange={handleChangeInput}
                                    />
                                </div>

                                <div className="modal-footer p-0 pt-2">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
