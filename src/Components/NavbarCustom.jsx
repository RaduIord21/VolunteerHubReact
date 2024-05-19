import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavbarCustom(props) {
    return (
        <div className="navbar-custom">
            <div className="topbar container-fluid">
                <div className="d-flex align-items-center gap-lg-2 gap-1">

                    <div className="logo-topbar">
                        <a href="index.html" className="logo-dark">
                            <span className="logo-lg">
                                <img src="assets/logo-voluntariat-light.png" alt="dark logo" />
                            </span>
                            <span className="logo-sm">
                                <img src="assets/images/logo-dark-sm.png" alt="small logo" />
                            </span>
                        </a>
                    </div>

                    <button className="button-toggle-menu">
                        <i className="mdi mdi-menu"></i>
                    </button>

                    <button className="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                        <div className="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>

                <ul className="topbar-menu d-flex align-items-center gap-3">
                    <li className="dropdown notification-list">
                        <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                            <FontAwesomeIcon icon="fa-solid fa-bell" />
                            <span className="noti-icon-badge"></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
                            <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h6 className="m-0 font-16 fw-semibold"> Notifications</h6>
                                    </div>
                                    <div className="col-auto">
                                        <a href="#" className="text-dark text-decoration-underline">
                                            <small>Clear All</small>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="px-2" style={{maxHeight: '300px'}} data-simplebar="">

                                <h5 className="text-muted font-13 fw-normal mt-2">Today</h5>

                                <a href="#" className="dropdown-item p-0 notify-item card unread-noti shadow-none mb-2">
                                    <div className="card-body">
                                        <span className="float-end noti-close-btn text-muted"><i className="mdi mdi-close"></i></span>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0">
                                                <div className="notify-icon bg-primary">
                                                    <i className="mdi mdi-comment-account-outline"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 text-truncate ms-2">
                                                <h5 className="noti-item-title fw-semibold font-14">Datacorp <small className="fw-normal text-muted ms-1">1 min ago</small></h5>
                                                <small className="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <div className="text-center">
                                    <i className="mdi mdi-dots-circle mdi-spin text-muted h3 mt-0"></i>
                                </div>
                            </div>

                            <a href="#" className="dropdown-item text-center text-primary notify-item border-top py-2">
                                View All
                            </a>

                        </div>
                    </li>


                    <li className="dropdown">
                        <a className="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                            <div data-letters="MN"></div>
                            <span className="d-lg-flex flex-column gap-1 d-none">
                                <p className="my-0 fw-bold">{ props.username }</p>
                                <small className="my-0">{ props.organization ?? 'N/A'}</small>
                            </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
                            <div className=" dropdown-header noti-title">
                                <h6 className="text-overflow m-0">Welcome !</h6>
                            </div>

                            <a href="/" className="dropdown-item">
                                <i className="mdi mdi-account-circle me-1"></i>
                                <span>My Account</span>
                            </a>

                            <a href="/" className="dropdown-item">
                                <i className="mdi mdi-account-edit me-1"></i>
                                <span>Settings</span>
                            </a>

                            <a href="/" className="dropdown-item">
                                <i className="mdi mdi-logout me-1"></i>
                                <span>Logout</span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export default NavbarCustom