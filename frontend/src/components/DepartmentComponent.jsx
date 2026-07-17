import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentComponent = () => {
  
  const [departmentName, setDepartmentName] = useState('')
  const [departmentDescription, setDepartmentDescription] = useState('')

  const navigator=useNavigate();
  const {id}=useParams();

  useEffect(() => {
    getDepartmentById(id).then((response) => {
      setDepartmentName(response.data.departmentName);
      setDepartmentDescription(response.data.departmentDescription);
    }).catch(error => {
      console.error(error);
    })
  }, [id])
  
  function saveUpdateDepartment(e) {
    e.preventDefault();

    const department = { departmentName, departmentDescription}

    console.log(department);

    if(id) {
      updateDepartment(id, department).then((response) => {
        console.log(response.data);
        navigator('/departments');
      }).catch(error => console.error(error))
    }

    else {
      createDepartment(department).then((response) => {
      console.log(response.data);
      navigator('/departments')
      }).catch(error => console.error(error))
    }
  }
  function pageTitle() {
    if(id) 
      return <h2 className='page-title'>{id ? "Update Department" : "Add Department"}</h2>
  }

  // return (
  //   <div className='container'><br /><br />
  //     <div className='row'>
  //       <div className='card col-md-6 offset-md-3 offset-md-3'>
  //         {
  //           pageTitle()
  //         }

  //         <div className='card-body'>
  //           <form>
  //             <div className='form-group mb-2'>
  //               <label className='form-label'>Department name:</label>
  //               <input type="text" name='departmentName' placeholder='Enter Department Name' value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} className='form-control'></input>
  //             </div>

  //             <div className='form-group mb-2'>
  //               <label className='form-label'>Department Description:</label>
  //               <input type="text" name='departmentDescription' placeholder='Enter Department Description' value={departmentDescription} onChange={(e) => setDepartmentDescription(e.target.value)} className='form-control'></input>
  //             </div>
  //             <button className='btn btn-success mb-2' onClick={(e) => saveUpdateDepartment(e)}>Submit</button>
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

                                Enter department information.

                            </p>

                        </div>

                        <form>

                            <div className="mb-3">

                                <label className="form-label">

                                    Department Name

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    placeholder="Enter Department Name"

                                    value={departmentName}

                                    onChange={(e)=>setDepartmentName(e.target.value)}

                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label">

                                    Department Description

                                </label>

                                <textarea

                                    rows="4"

                                    className="form-control"

                                    placeholder="Enter Department Description"

                                    value={departmentDescription}

                                    onChange={(e)=>setDepartmentDescription(e.target.value)}

                                />

                            </div>

                            <div className="d-flex justify-content-end gap-2">

                                <button

                                    type="button"

                                    className="btn btn-secondary"

                                    onClick={()=>navigator('/departments')}

                                >

                                    Cancel

                                </button>

                                <button

                                    className="btn btn-primary"

                                    onClick={saveUpdateDepartment}

                                >

                                    {id ? "Update Department" : "Add Department"}

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

export default DepartmentComponent