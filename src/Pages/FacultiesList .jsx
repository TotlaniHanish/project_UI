import { useEffect, useState } from "react";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function FacultiesList() {

    // FOR FETCHING FACULTIES DATA
    const [getFaculties, setGetFaculties] = useState(false);
    const [faculties, setFaculties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setGetFaculties(true);
    }, []);

    useEffect(() => {
        console.log(faculties)
        console.log(faculties?.length)
    }, [faculties]);

    const successCallback = (data) => {
        setGetFaculties(false);
        console.log(data);
        setFaculties(data?._embedded?.faculties);
    }

    useFetch('GET', `/faculties`, {}, successCallback, null, getFaculties);
    // END FOR FETCHING FACULTIES DATA


    // FOR UPDATING FACULTIES DATA
    const [selectedFaculties, setSelectedFaculties] = useState({
        name: "",
        email: "",
        rank: "",
        universityId: ""
    });  // Track the selected course

    const openModal = (faculty) => {
        setSelectedFaculties(faculty);
        // Open the modal
        const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    }

    const [updateFaculty, setUpdateFaculty] = useState(false);

    const successCallbackUpdate = (data) => {
        setUpdateFaculty(false);
        setGetFaculties(true);
    };

    const handleChangeInput = (e) => {
        setSelectedFaculties({ ...selectedFaculties, [e.target.name]: e.target.value })
    }

    const handleUpdateFaculty = (e) => {
        e.preventDefault();
        setUpdateFaculty(true);
    };

    useFetch('PUT', `/faculties/${selectedFaculties?.identity}`, selectedFaculties, successCallbackUpdate, null, updateFaculty);
    // END FOR UPDATING FACULTIES DATA 

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="card m-3">
                    <div className="card-body">
                        <div className="table-responsive">
                            {(faculties && faculties.length) ?
                                <table className="table text-grey">
                                    <thead className="fw-bold">
                                        <tr>
                                            <td>Faculties</td>
                                            <td width="20%"><button className="btn btn-primary" title="add" onClick={() => { return 0; }}><i class="bi bi-plus-circle-fill"></i></button></td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {faculties.map((faculty) => { return <tr key={faculty.identity}><td>{faculty?.name}</td><td><button title="edit" className="btn btn-primary" onClick={() => openModal(faculty)}><i class="bi bi-pencil-square"></i></button></td></tr> })}
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
                            <form onSubmit={handleUpdateFaculty}>
                                <div className="mb-3">
                                    <label for="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={selectedFaculties?.name || ''}
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
                                        value={selectedFaculties?.email || ''}
                                        onChange={handleChangeInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="rank" className="form-label">Rank</label>
                                    <select class="form-select" name="rank" onChange={handleChangeInput} value={selectedFaculties?.rank || ''}>
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
                                        value={selectedFaculties?.universityId || ''}
                                        onChange={handleChangeInput}
                                        required
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