import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar navbar-light bg-light py-3">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand ms-2">College Program</Link>
                    <form className="d-flex">
                        <>
                            <Link to="/departments"><button className="btn btn-primary  me-2" type="button">Departments</button></Link>
                            <Link to="/programs"><button className="btn btn-primary  me-2" type="button">Programs</button></Link>
                            <Link to="/courses"><button className="btn btn-primary  me-2" type="button">Courses</button></Link>
                            <Link to="/faculties"><button className="btn btn-primary  me-2" type="button">Faculties</button></Link>
                        </>
                        
                    </form>
                </div>
            </nav>
        </>
    )
}