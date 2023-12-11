import { useEffect, useState } from "react";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function ProgramsList() {

    // FOR FETCHING PROGRAM DATA 
    const [getPrograms, setGetPrograms] = useState(false);
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setGetPrograms(true);
    }, []);

    useEffect(() => {
        console.log(programs)
        console.log(programs.length)
    }, [programs]);

    const successCallback = (data) => {
        setGetPrograms(false);
        console.log(data);
        setPrograms(data?._embedded?.programs);
    }

    useFetch('GET', `/programs`, {}, successCallback, null, getPrograms);
    // END FOR FETCHING PROGRAM DATA


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
        console.log(data);
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


    // FOR UPDATING PROGRAM DATA
    const [selectedProgramData, setSelectedProgramData] = useState({
        name: "",
        inchargeId: "",
        departmentId: ""
    });  // Track the selected course

    const openModal = (program) => {
        setSelectedProgramData(program);
        // Open the modal
        const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    }

    const [updateProgram, setUpdateProgram] = useState(false);

    const successCallbackUpdate = (data) => {
        setUpdateProgram(false);
        setGetPrograms(true);
    };

    const handleChangeInput = (e) => {
        setSelectedProgramData({ ...selectedProgramData, [e.target.name]: e.target.value });
    }

    const handleUpdateProgram = (e) => {
        e.preventDefault();
        setUpdateProgram(true);
    };

    useFetch('PUT', `/programs/${selectedProgramData?.identity}`, selectedProgramData, successCallbackUpdate, null, updateProgram);
    // END FOR UPDATING PROGRAM DATA

    const toAddProgram = () => {
        navigate('/addprogram');
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="card m-3">
                    <div className="card-body">
                        <div className="table-responsive">
                            {(programs && programs.length) ?
                                <table className="table text-grey">
                                    <thead className="fw-bold">
                                        <tr>
                                            <td>Programs</td>
                                            <td width="20%"><button className="btn btn-primary btn-sm" title="add" onClick={toAddProgram}><i class="bi bi-plus-circle-fill"></i></button></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {programs.map((program) => { return <tr key={program.identity}><td>{program?.name}</td><td><button className="btn btn-primary btn-sm" title="edit" onClick={() => openModal(program)}><i class="bi bi-pencil-square"></i></button></td></tr> })}
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
                            <h5 className="modal-title" id="exampleModalLabel">Edit Faculty</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdateProgram}>
                                <div className="mb-3">
                                    <label for="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={selectedProgramData.name}
                                        onChange={handleChangeInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="inchargeId" className="form-label">InCharge</label>
                                    <select class="form-select" name="inchargeId" onChange={handleChangeInput} value={selectedProgramData.inchargeId}>
                                        {faculties.map(faculty => {
                                            return <option key={faculty.identity} value={faculty.identity}>{faculty.name}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label for="departmentId" className="form-label">Department</label>
                                    <select class="form-select" name="departmentId" onChange={handleChangeInput} value={selectedProgramData.departmentId}>
                                        {departments.map(department => {
                                            return <option key={department.identity} value={department.identity}>{department.name}</option>
                                        })}
                                    </select>
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