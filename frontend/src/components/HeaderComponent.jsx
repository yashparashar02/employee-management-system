// import React from 'react'
// import { NavLink } from 'react-router-dom'

// const HeaderComponent = () => {
//   return (
//     <div>
//       <header>
//         <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
//           <a className="navbar-brand" href="http://localhost:3000/">Employee Management System</a>

//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <NavLink className='nav-link' to='/employees'>Employees</NavLink>
//               </li>

//               <li className="nav-item">
//                 <NavLink className='nav-link' to='/departments'>Deparments</NavLink>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </header>
//     </div>
//   )
// }

// export default HeaderComponent

import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaUsers, FaBuilding } from 'react-icons/fa'

const HeaderComponent = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark corporate-navbar">

                <div className="container">

                    <NavLink className="navbar-brand fw-bold" to="/">
                        Employee Management
                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">

                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item">

                                <NavLink
                                    to="/employees"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active-nav"
                                            : "nav-link"
                                    }
                                >
                                    <FaUsers className="me-2" />
                                    Employees
                                </NavLink>

                            </li>

                            <li className="nav-item">

                                <NavLink
                                    to="/departments"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active-nav"
                                            : "nav-link"
                                    }
                                >
                                    <FaBuilding className="me-2" />
                                    Departments
                                </NavLink>

                            </li>

                        </ul>

                    </div>

                </div>

            </nav>
        </header>
    )
}

export default HeaderComponent