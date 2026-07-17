// import React, { useEffect, useState } from 'react'
// import { deleteDepartment, getAllDepartments } from '../services/DepartmentService';
// import { Link, useNavigate } from 'react-router-dom'

// const ListDepartmentComponents = () => {

//   const [departments, setDepartments] = useState([]);

//   const navigator=useNavigate();

//   useEffect(() => listOfDepartments(), [])

//   function listOfDepartments() {
//     getAllDepartments().then((response) => {
//       console.log(response.data);
//       setDepartments(response.data);
//     }).catch(error => {
//       console.error(error);
//     })
//   }

//   function updateDepartment(id) {
//     navigator(`/edit-department/${id}`)
//   }

//   function removeDepartment(id) {
//     deleteDepartment(id).then((response) => {
//       console.log(response.data);
//       listOfDepartments();
//     }).catch(error => console.error(error))
//   }

//   return (
//     <div className='container'>
//       <h2 className='text-center'>List Of Departments</h2>
//       <Link to='/add-department' className='btn btn-primary mb-2'>Add Department</Link>
//       <table className='table table-striped table-bordered'>
//         <thead>
//           <tr>
//             <th>Department ID</th>
//             <th>Department Name</th>
//             <th>Department Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {
//             departments.map(department => 
//               <tr key={department.id}>
//                 <td>{department.id}</td>
//                 <td> {department.departmentName} </td>
//                 <td> {department.departmentDescription} </td>
//                 <td>
//                   <button onClick={() => updateDepartment(department.id)} className='btn btn-info'>Update</button>
//                   <button onClick={() => removeDepartment(department.id)} className='btn btn-danger' style={{marginLeft: "10px"}}>Delete</button>
//                 </td>
//               </tr>
//             )
//           }
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default ListDepartmentComponents

import React, { useEffect, useMemo, useState } from 'react'
import { deleteDepartment, getAllDepartments } from '../services/DepartmentService'
import { Link, useNavigate } from 'react-router-dom'
import {
    FaBuilding,
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch
} from 'react-icons/fa'

const ListDepartmentComponents = () => {

    const [departments, setDepartments] = useState([])
    const [search, setSearch] = useState("")

    const navigator = useNavigate()

    useEffect(() => {
        listDepartments()
    }, [])

    function listDepartments() {
        getAllDepartments()
            .then(response => setDepartments(response.data))
            .catch(console.error)
    }

    function updateDepartment(id) {
        navigator(`/edit-department/${id}`)
    }

    function removeDepartment(id) {

        if (!window.confirm("Delete this department?"))
            return

        deleteDepartment(id)
            .then(() => listDepartments())
            .catch(console.error)
    }

    const filteredDepartments = useMemo(() => {

        return departments.filter(department => {

            const keyword = search.toLowerCase()

            return (

                department.departmentName
                    .toLowerCase()
                    .includes(keyword)

                ||

                department.departmentDescription
                    .toLowerCase()
                    .includes(keyword)

            )

        })

    }, [departments, search])

    return (

        <div className="container fade-up">

            <div className="dashboard-header">

                <div>

                    <h2 className="page-title">
                        Department Management
                    </h2>

                    <p className="page-subtitle">
                        Manage all company departments.
                    </p>

                </div>

                <Link
                    to="/add-department"
                    className="btn btn-primary"
                >

                    <FaPlus className="me-2"/>

                    Add Department

                </Link>

            </div>

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="stats-card">

                        <FaBuilding className="stats-icon"/>

                        <div>

                            <h3>{departments.length}</h3>

                            <p>Total Departments</p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card shadow-sm">

                <div className="card-body">

                    <div className="search-box">

                        <FaSearch className="search-icon"/>

                        <input
                            className="form-control"
                            placeholder="Search department..."
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />

                    </div>

                    <div className="table-responsive mt-4">

                        <table className="table table-hover align-middle">

                            <thead>

                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Description</th>

                                <th width="180">
                                    Actions
                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {

                                filteredDepartments.length===0 ?

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center py-5"
                                    >
                                        No departments found.
                                    </td>

                                </tr>

                                :

                                filteredDepartments.map(department=>(

                                    <tr key={department.id}>

                                        <td>{department.id}</td>

                                        <td>{department.departmentName}</td>

                                        <td>{department.departmentDescription}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={()=>updateDepartment(department.id)}
                                            >
                                                <FaEdit/>
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={()=>removeDepartment(department.id)}
                                            >
                                                <FaTrash/>
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

export default ListDepartmentComponents