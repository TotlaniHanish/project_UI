import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Components/commons/useFetch";
import Navbar from "../Components/Navbar";

export default function AddDepartment() {
    const [codeVal, setCodeVal] = useState("");
    const [addDep, setAddDep] = useState(false);
    const [depData, setDepData] = useState({
        name: "",
        code: ""
    });
    const navigate = useNavigate();

    const successCallback = (data) => {
        setAddDep(false);
        console.log("Course added successfully:", data);

        navigate("/departments");
    };

    const handleChangeInput = (e) => {
        setDepData({ ...depData, [e.target.name]: e.target.value })
    }

    const handleAddDep = (e) => {
        e.preventDefault();
        if (codeVal == 'is-valid') {
            setAddDep(true);
        } else {
            setCodeVal("is-invalid")
        }
    };

    useFetch('POST', '/departments', depData, successCallback, null, addDep);
    return (
        <>
            <Navbar />
            <form onSubmit={handleAddDep} className="w-75 p-5 py-4 mx-auto mt-5 border border-2 rounded">
                <p className="fs-2">Add Department</p>
                <div className="mb-3">
                    <label for="depName" className="form-label">Department Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="depName"
                        name="name"
                        value={depData.name}
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
                        value={depData.code}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            setDepData({ ...depData, code: inputValue });
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};



