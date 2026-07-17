import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllDepartments } from '../services/DepartmentService'

const EmployeeComponent = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    getAllDepartments().then((response) => {
      setDepartments(response.data);
    }).catch(error => console.error(error))
  }, [])

  const [errors, setErrors] = useState( {firstName: '', lastName: '', email: '', department: ''})

  const navigator=useNavigate();

  const {id} = useParams();

  useEffect(() => {
    if(id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setDepartmentId(response.data.departmentId);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if(validateForm()) {
      const employee = {firstName, lastName, email, departmentId}
      console.log(employee)

      if(id) {
        updateEmployee(id, employee).then((response) => {
          console.log(response.data);
          navigator('/employees');
        }).catch(error => {
          console.error(error);
        })
      }

      else {
        createEmployee(employee).then((response) => {
        console.log(response.data);
        navigator('/employees');
      }).catch(error => {
        console.error(error);
        })
      }
    }
    
  }

  function validateForm() {
    let valid=true;

    const errorsCopy={... errors}

    if(firstName.trim()) 
      errorsCopy.firstName='';

    else {
      errorsCopy.firstName='First Name is required';
      valid=false;
    }

    if(lastName.trim())
      errorsCopy.lastName='';

    else {
      errorsCopy.lastName='Last Name is required';
      valid=false;
    }

    if(email.trim())
      errorsCopy.email='';

    else {
      errorsCopy.email="Email is required";
      valid=false;
    }

    if(departmentId) 
      errorsCopy.department=''
    
    else {
      errorsCopy.department = 'Select Department'
      valid=false
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if(id)
      return <h2 className='page-title'> {id ? "Update Employee" : "Add Employee"}</h2>
    //     Update Employee</h2>

    // else
    //   return <h2 className='text-center'>Add Employee</h2>
  }

  // return (
  //   <div className='container'>
  //     <br /> <br />
  //     <div className='row'>
  //       <div className='card col-md-6 offset-md-3 offset-md-3'>
  //         {
  //           pageTitle()
  //         }
  //         <div className='card-body'>
  //           <form>
  //             <div className='form-group mb-2'>
  //               <label className='form-label'>First Name</label>
  //               <input type="text" placeholder='Enter Employee First Name' name='firstName' value={firstName} className={`form-control ${errors.firstName ? 'is-invalid':''}`} onChange={(e) => setFirstName(e.target.value)}/>
  //               { errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
  //             </div>

  //             <div className='form-group mb-2'>
  //               <label className='form-label'>Last Name</label>
  //               <input type="text" placeholder='Enter Employee Last Name' name='lastName' value={lastName} className={`form-control ${errors.lastName ? 'is-invalid':''}`} onChange={(e) => setLastName(e.target.value)}/>
  //               { errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
  //             </div>

  //             <div className='form-group mb-2'>
  //               <label className='form-label'>Email</label>
  //               <input type="email" placeholder='Enter Employee Email' name='email' value={email} className={`form-control ${errors.email ? 'is-invalid':''}`} onChange={(e) => setEmail(e.target.value)}/>
  //               { errors.email && <div className='invalid-feedback'> {errors.email} </div>}
  //             </div>

  //             <div className='form-group mb-2'>
  //               <label className='form-label'>Select Department</label>
  //               <select className={`form-control ${errors.department ? 'is-invalid':''}`} value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
  //                 <option value="Select Department">Select Department</option>
  //                 {
  //                   departments.map( department => 
  //                     <option key={department.id} value={department.id}>{department.departmentName}</option>)
  //                 }
  //               </select>
  //               { errors.department && <div className='invalid-feedback'> {errors.department} </div>}
  //             </div>

  //             <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
  return (

    <div className="container fade-up">

        <div className="row justify-content-center">

            <div className="col-lg-8">

                <div className="card shadow-sm">

                    <div className="card-body">

                        <div className="mb-4">

                            {pageTitle()}

                            <p className="page-subtitle">
                                Fill in the employee information below.
                            </p>

                        </div>

                        <form>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        placeholder="Enter First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />

                                    {
                                        errors.firstName &&
                                        <div className="invalid-feedback">
                                            {errors.firstName}
                                        </div>
                                    }

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        placeholder="Enter Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />

                                    {
                                        errors.lastName &&
                                        <div className="invalid-feedback">
                                            {errors.lastName}
                                        </div>
                                    }

                                </div>

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    placeholder="Enter Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                {
                                    errors.email &&
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                }

                            </div>

                            <div className="mb-4">

                                <label className="form-label">
                                    Department
                                </label>

                                <select
                                    className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                                    value={departmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                >

                                    <option value="">
                                        Select Department
                                    </option>

                                    {
                                        departments.map(department => (

                                            <option
                                                key={department.id}
                                                value={department.id}
                                            >
                                                {department.departmentName}
                                            </option>

                                        ))
                                    }

                                </select>

                                {
                                    errors.department &&
                                    <div className="invalid-feedback">
                                        {errors.department}
                                    </div>
                                }

                            </div>

                            <div className="d-flex justify-content-end gap-2">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigator('/employees')}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-primary"
                                    onClick={saveOrUpdateEmployee}
                                >
                                    {id ? "Update Employee" : "Add Employee"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    </div>

  )
}

export default EmployeeComponent