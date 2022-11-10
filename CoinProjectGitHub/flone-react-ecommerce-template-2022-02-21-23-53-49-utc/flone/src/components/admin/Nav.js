import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";


const Nav = (props) => {
    return (
        <header className="nav-header">
            <div className="nav-content">

                <div className='nav-logo'>
                    <Link to='/admin'>
                        <a className="nav-link">
                            Admin Panel
                        </a>
                    </Link>
                </div>
                <div className='nav-box'>
                    <ul className="nav-options">
                        <li>
                            <Link to='/admin-orders'>
                                <a className="nav-link" >
                                    All Orders
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to='admin-products'>
                                <a className="nav-link" >
                                    Products
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to='admin-users'>
                                <a className="nav-link" >
                                    Users
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin-login' onClick={async () => await axios.post(`${process.env.REACT_APP_ADMIN_SERVER_BACKEND}/logout`)}>
                                <a className="nav-link" >
                                    Sign out
                                </a>
                            </Link>
                        </li>
                    </ul>


                </div>
            </div>
        </header>
    );
};

export default Nav;