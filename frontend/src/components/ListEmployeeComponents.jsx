// import React, {useEffect, useState} from 'react'
// import { deleteEmployee, listEmployees } from '../services/EmployeeService'
// import { useNavigate } from 'react-router-dom'

// const ListEmployeeComponents = () => {

//   const[employees, setEmployees] = useState([])

//   const navigator=useNavigate();

//   useEffect(() => { getAllEmployees(); }, [])

//   function getAllEmployees() {
//     listEmployees().then((response) => {
//       setEmployees(response.data);
//     }).catch(error => {
//       console.error(error);
//     })
//   }

//   function addNewEmployee() {
//     navigator('/add-employee')
//   }

//   function updateEmployee(id) {
//     navigator(`/edit-employee/${id}`)
//   }

//   function removeEmployee(id) {
//     console.log(id);

//     deleteEmployee(id).then((response) => { getAllEmployees(); }).catch(error => {
//       console.error(error);
//     })
//   }

//   return (
//     <div className='container'>
//       <h2 className='text-center'>List of Employees</h2>
//       <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
//       <table className='table table-striped table-bordered'>
//         <thead>
//           <tr>
//             <th>Employee ID</th>
//             <th>Employee First Name</th>
//             <th>Employee Last Name</th>
//             <th>Employee Email Id</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             employees.map(employee => 
//               <tr key={employee.id}>
//                 <td>{employee.id}</td>
//                 <td>{employee.firstName}</td>
//                 <td>{employee.lastName}</td>
//                 <td>{employee.email}</td>
//                 <td>
//                   <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
//                   <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)} style={{marginLeft: '10px'}}>Delete</button>
//                 </td>
//               </tr>
//             )
//           }
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default ListEmployeeComponents

import React, { useEffect, useMemo, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaUsers
} from 'react-icons/fa'

const ListEmployeeComponents = () => {

    const [employees, setEmployees] = useState([])
    const [search, setSearch] = useState("")

    const navigator = useNavigate()

    useEffect(() => {
        getAllEmployees()
    }, [])

    function getAllEmployees() {
        listEmployees()
            .then((response) => {
                setEmployees(response.data)
            })
            .catch(console.error)
    }

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {

        if (!window.confirm("Delete this employee?")) return

        deleteEmployee(id)
            .then(() => getAllEmployees())
            .catch(console.error)
    }

    const filteredEmployees = useMemo(() => {

        return employees.filter(employee => {

            const keyword = search.toLowerCase()

            return (
                employee.firstName.toLowerCase().includes(keyword) ||
                employee.lastName.toLowerCase().includes(keyword) ||
                employee.email.toLowerCase().includes(keyword)
            )

        })

    }, [employees, search])

    return (

        <div className="container fade-up">

            <div className="dashboard-header">

                <div>

                    <h2 className="page-title">
                        Employee Management
                    </h2>

                    <p className="page-subtitle">
                        Manage employees efficiently from one place.
                    </p>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={addNewEmployee}
                >
                    <FaPlus className="me-2" />
                    Add Employee
                </button>

            </div>

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="stats-card">

                        <FaUsers className="stats-icon" />

                        <div>

                            <h3>{employees.length}</h3>

                            <p>Total Employees</p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card shadow-sm">

                <div className="card-body">

                    <div className="search-box">

                        <FaSearch className="search-icon" />

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search employee..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <div className="table-responsive mt-4">

                        <table className="table table-hover align-middle">

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th width="180">Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredEmployees.length === 0 ?

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="text-center py-5"
                                            >
                                                No employees found.
                                            </td>

                                        </tr>

                                        :

                                        filteredEmployees.map(employee => (

                                            <tr key={employee.id}>

                                                <td>{employee.id}</td>

                                                <td>{employee.firstName}</td>

                                                <td>{employee.lastName}</td>

                                                <td>{employee.email}</td>

                                                <td>

                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() => updateEmployee(employee.id)}
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => removeEmployee(employee.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default ListEmployeeComponents