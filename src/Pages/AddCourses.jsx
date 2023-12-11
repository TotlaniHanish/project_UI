import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";

export default function AddCourses() {
    const [addCourse, setAddCourse] = useState(false);
    const [courseData, setCourseData] = useState({
        title: "",
        description: ""
    });
    const navigate = useNavigate();

    const successCallback = (data) => {
        setAddCourse(false);
        console.log("Course added successfully:", data);

        navigate("/courses");
    };

    const handleChangeInput = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value })
    }

    const handleAddCourse = (e) => {
        e.preventDefault();
        setAddCourse(true);
    };

    useFetch('POST', '/courses', courseData, successCallback, null, addCourse);
    return (
        <>
            <Navbar />
            <form onSubmit={handleAddCourse} className="w-75 p-5 py-4 mx-auto mt-5 border border-2 rounded">
                <p className="fs-2">Add Course</p>
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={courseData.title}
                        onChange={handleChangeInput}
                        required
                    />
                </div>
                
                <div className="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={courseData.description}
                        onChange={handleChangeInput}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};



