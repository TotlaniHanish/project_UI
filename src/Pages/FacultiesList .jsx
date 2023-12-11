import { useEffect, useState } from "react";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function FacultiesList() {

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

    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="card m-3">
                    <div className="card-body">
                        <div className="table-responsive">
                        { ( faculties && faculties.length ) ?
                                <table className="table text-grey">
                                    <thead className="fw-bold">
                                        <tr>
                                            <td>Faculties</td>
                                            <td width="20%"><button className="btn btn-primary" title="add" onClick={() => {return 0;}}><i class="bi bi-plus-circle-fill"></i></button></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                        { faculties.map((faculty) => { return <tr key={faculty.identity}><td>{faculty?.name}</td><td><button title="edit" className="btn btn-primary" onClick={() => {return 0;}}><i class="bi bi-pencil-square"></i></button></td></tr> }) }
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