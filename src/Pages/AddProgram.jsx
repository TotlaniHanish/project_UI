import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";

export default function AddProgram() {

    //FOR ADDING PROGRAM DETAILS
    const [addProgram, setAddProgram] = useState(false);
    const [programData, setProgramData] = useState({
        name: "",
        inchargeId: "",
        departmentId: ""
    });
    const navigate = useNavigate();

    const successCallback = (data) => {
        setAddProgram(false);
        console.log("Course added successfully:", data);

        navigate("/programs");
    };

    const handleChangeInput = (e) => {
        setProgramData({ ...programData, [e.target.name]: e.target.value })
    }

    const handleAddProgram = (e) => {
        e.preventDefault();
        setAddProgram(true);
    };

    useFetch('POST', '/programs', programData, successCallback, null, addProgram);
    //FOR ADDING PROGRAM DETAILS

    // FOR FETCHING FACULTIES DATA
    const [getFaculties, setGetFaculties] = useState(false);
    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        setGetFaculties(true);
    }, []);

    useEffect(() => {
        console.log(faculties)
        console.log(faculties?.length)
    }, [faculties]);

    const successCallbackFaculty = (data) => {
        setGetFaculties(false);
        setFaculties(data?._embedded?.faculties);
    }

    useFetch('GET', `/faculties`, {}, successCallbackFaculty, null, getFaculties);
    // END FOR FETCHING FACULTIES DATA

    // FOR FETCHING DEPARTMENT DATA
    const [getDepartments, setGetDepartments] = useState(false);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        setGetDepartments(true);
    }, []);

    useEffect(() => {
        console.log(departments)
        console.log(departments.length)
    }, [departments]);

    const successCallbackDepartment = (data) => {
        setGetDepartments(false);
        console.log(data);
        setDepartments(data?._embedded?.departments);
    }

    const startAssginment = (assignment) => {
        sessionStorage.setItem('assignment', JSON.stringify(assignment));
        navigate("/startAssignment");
    }

    useFetch('GET', `/departments`, {}, successCallbackDepartment, null, getDepartments);
    //END FOR FETCHING DEPARTMENT DATA
    
    return (
        <>
            <Navbar />
            <form onSubmit={handleAddProgram} className="w-75 p-5 my-5 py-4 mx-auto border border-2 rounded">
                <p className="fs-2">Add Program</p>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={programData.name}
                        onChange={handleChangeInput}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label for="inchargeId" className="form-label">InCharge</label>
                    <select class="form-select" name="inchargeId" onChange={handleChangeInput} value={programData.inchargeId}>
                        {faculties.map(faculty => {
                            return <option key={faculty.identity} value={faculty.identity}>{faculty.name}</option>
                        })}
                    </select>
                </div>
                
                <div className="mb-3">
                    <label for="departmentId" className="form-label">Department</label>
                    <select class="form-select" name="departmentId" onChange={handleChangeInput} value={programData.departmentId}>
                    {departments.map(department => {
                            return <option key={department.identity} value={department.identity}>{department.name}</option>
                        })}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};



