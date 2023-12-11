import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";

export default function AddFaculty() {
    const [addFaculty, setAddFaculty] = useState(false);
    const [facultyData, setFacultyData] = useState({
        name: "",
        email: "",
        rank: "",
        universityId: ""
    });
    const navigate = useNavigate();

    const successCallback = (data) => {
        setAddFaculty(false);
        console.log("Course added successfully:", data);

        navigate("/faculties");
    };

    const handleChangeInput = (e) => {
        setFacultyData({ ...facultyData, [e.target.name]: e.target.value })
    }

    const handleAddFaculty = (e) => {
        e.preventDefault();
        setAddFaculty(true);
    };

    useFetch('POST', '/faculties', facultyData, successCallback, null, addFaculty);
    return (
        <>
            <Navbar />
            <form onSubmit={handleAddFaculty} className="w-75 p-5 my-5 py-4 mx-auto border border-2 rounded">
                <p className="fs-2">Add Faculty</p>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={facultyData.name}
                        onChange={handleChangeInput}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={facultyData.email}
                        onChange={handleChangeInput}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label for="rank" className="form-label">Rank</label>
                    <select class="form-select" name="rank" onChange={handleChangeInput} value={facultyData.rank}>
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                
                <div className="mb-3">
                    <label for="universityId" className="form-label">University Id</label>
                    <input
                        type="text"
                        className='form-control'
                        id="universityId"
                        name="universityId"
                        value={facultyData.universityId}
                        onChange={handleChangeInput}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};



