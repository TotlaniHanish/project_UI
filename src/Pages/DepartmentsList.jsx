import { useEffect, useState } from "react";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function DepartmentList() {

    // FOR FETCHING DEPARTMENT DATA
    const [getDepartments, setGetDepartments] = useState(false);
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setGetDepartments(true);
    }, []);

    useEffect(() => {
        console.log(departments)
        console.log(departments.length)
    }, [departments]);

    const successCallback = (data) => {
        setGetDepartments(false);
        console.log(data);
        setDepartments(data?._embedded?.departments);
    }

    const startAssginment = (assignment) => {
        sessionStorage.setItem('assignment', JSON.stringify(assignment));
        navigate("/startAssignment");
    }

    useFetch('GET', `/departments`, {}, successCallback, null, getDepartments);
    // END FOR FETCHING DEPARTMENT DATA

    // -------------------------------------------------------------------------------------

    // FOR UPDATING DEPARTMENT DATA
    const [selectedDepartment, setSelectedDepartment] = useState({
        name: "",
        code: ""
    });  // Track the selected course

    const openModal = (course) => {
        setSelectedDepartment(course);
        // Open the modal
        const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    }

    const [codeVal, setCodeVal] = useState("");
    const [updateDep, setUpdateDep] = useState(false);


    const successCallbackUpdate = (data) => {
        setUpdateDep(false);
        setGetDepartments(true);
    };

    const handleChangeInput = (e) => {
        setSelectedDepartment({ ...selectedDepartment, [e.target.name]: e.target.value })
    }

    const handleUpdateDep = (e) => {
        e.preventDefault();
        if (codeVal == 'is-valid') {
            setUpdateDep(true);
        } else {
            setCodeVal("is-invalid")
        }
    };

    useFetch('PUT', `/departments/${selectedDepartment?.identity}`, selectedDepartment, successCallbackUpdate, null, updateDep);
    // END FOR UPDATING DEPARTMENT DATA

    const toAddDepartment = () => {
        navigate('/adddepartment')
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="card m-3">
                    <div className="card-body">
                        <div className="table-responsive">
                            {(departments && departments.length) ?
                                <table className="table text-grey">
                                    <thead className="fw-bold">
                                        <tr>
                                            <td>Departments</td>
                                            <td width="20%"><button className="btn btn-primary btn-sm" title="add" onClick={toAddDepartment}><i class="bi bi-plus-circle-fill"></i></button></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {departments.map((dept) => { return <tr key={dept.identity}><td>{dept?.name}</td><td><button title="edit" className="btn btn-primary btn-sm" onClick={() => openModal(dept)}><i class="bi bi-pencil-square"></i></button></td></tr> })}
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
                            <h5 className="modal-title" id="exampleModalLabel">Edit Department</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdateDep}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={selectedDepartment?.name || ''}
                                        onChange={handleChangeInput}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label for="depCode" className="form-label">Department Code</label>
                                    <input
                                        type="text"
                                        className={`form-control ${codeVal}`}
                                        id="depCode"
                                        name="code"
                                        value={selectedDepartment.code || ''}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            setSelectedDepartment({ ...selectedDepartment, code: inputValue });
                                            if (inputValue.length <= 4 && inputValue != 0) {
                                                setCodeVal("is-valid")
                                            } else {
                                                setCodeVal("is-invalid")
                                            }
                                        }}
                                        placeholder="The code should not exceed four letters"
                                    />
                                    <div class="invalid-feedback">
                                        The code should not exceed four letters
                                    </div>
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