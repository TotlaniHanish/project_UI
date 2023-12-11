import { useEffect, useState } from "react";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function DepartmentList() {

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

    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="card m-3">
                    <div className="card-body">
                        <div className="table-responsive">
                        { ( departments && departments.length ) ?
                                <table className="table text-grey">
                                    <thead className="fw-bold">
                                        <tr>
                                            <td>Departments</td>
                                            <td width="20%"><button className="btn btn-primary" title="add" onClick={() => {return 0;}}><i class="bi bi-plus-circle-fill"></i></button></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                        { departments.map((dept) => { return <tr key={dept.identity}><td>{dept?.name}</td><td><button title="edit" className="btn btn-primary" onClick={() => {return 0;}}><i class="bi bi-pencil-square"></i></button></td></tr> }) }
                                        
                                
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