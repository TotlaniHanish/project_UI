import { useEffect, useState } from "react";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

export default function ProgramsList() {

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

    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="card m-3">
                    <div className="card-body">
                        <div className="table-responsive">
                        { ( programs && programs.length ) ?
                                <table className="table text-grey">
                                    <thead className="fw-bold">
                                        <tr>
                                            <td>Programs</td>
                                            <td width="20%"><button className="btn btn-primary" title="add" onClick={() => {return 0;}}><i class="bi bi-plus-circle-fill"></i></button></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                        { programs.map((program) => { return <tr key={program.identity}><td>{program?.name}</td><td><button className="btn btn-primary" title="edit" onClick={() => {return 0;}}><i class="bi bi-pencil-square"></i></button></td></tr> }) }
                                        
                                
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