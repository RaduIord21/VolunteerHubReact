import {Outlet} from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="wrapper">

            <div className="navbar-custom">
                <div className="topbar container-fluid">
                    <div className="d-flex align-items-center gap-lg-2 gap-1">

                        <div className="logo-topbar">

                            <a href="index.html" className="logo-dark">
                            <span className="logo-lg">
                                <img src="assets/logo-voluntariat-light.png" alt="dark logo"/>
                            </span>
                                <span className="logo-sm">
                                <img src="assets/images/logo-dark-sm.png" alt="small logo"/>
                            </span>
                            </a>
                        </div>

                        <button className="button-toggle-menu">
                            <i className="mdi mdi-menu"></i>
                        </button>

                        <button className="navbar-toggle" data-bs-toggle="collapse"
                                data-bs-target="#topnav-menu-content">
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>

                        <div className="app-search dropdown d-none d-lg-block">
                            <form>
                                <div className="input-group">
                                    <input type="search" className="form-control dropdown-toggle"
                                           placeholder="Search..." id="top-search"/>
                                    <span className="mdi mdi-magnify search-icon"></span>
                                    <button className="input-group-text btn btn-primary" type="submit">Search</button>
                                </div>
                            </form>

                            <div className="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">
                                <div className="dropdown-header noti-title">
                                    <h5 className="text-overflow mb-2">Found <span
                                        className="text-danger">17</span> results</h5>
                                </div>

                                <a href="javascript:void(0);" className="dropdown-item notify-item">
                                    <i className="uil-notes font-16 me-1"></i>
                                    <span>Analytics Report</span>
                                </a>

                                <div className="dropdown-header noti-title">
                                    <h6 className="text-overflow mb-2 text-uppercase">Users</h6>
                                </div>

                                <div className="notification-list">
                                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                                        <div className="d-flex">
                                            <img className="d-flex me-2 rounded-circle"
                                                 src="assets/images/users/avatar-2.jpg" alt="Generic placeholder image"
                                                 height="32"/>
                                            <div className="w-100">
                                                <h5 className="m-0 font-14">Erwin Brown</h5>
                                                <span className="font-12 mb-0">UI Designer</span>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="topbar-menu d-flex align-items-center gap-3">
                        <li className="dropdown d-lg-none">
                            <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#"
                               role="button" aria-haspopup="false" aria-expanded="false">
                                <i className="ri-search-line font-22"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                                <form className="p-3">
                                    <input type="search" className="form-control" placeholder="Search ..."
                                           aria-label="Recipient's username"/>
                                </form>
                            </div>
                        </li>


                        <li className="dropdown notification-list">
                            <a className="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#"
                               role="button" aria-haspopup="false" aria-expanded="false">
                                <i className="fa fa-bell"></i>
                                <span className="noti-icon-badge"></span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
                                <div className="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0 font-16 fw-semibold"> Notification</h6>
                                        </div>
                                        <div className="col-auto">
                                            <a href="javascript: void(0);"
                                               className="text-dark text-decoration-underline">
                                                <small>Clear All</small>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-2" style={{maxHeight: '300px'}} data-simplebar>

                                    <h5 className="text-muted font-13 fw-normal mt-2">Today</h5>

                                    <a href="javascript:void(0);"
                                       className="dropdown-item p-0 notify-item card unread-noti shadow-none mb-2">
                                        <div className="card-body">
                                            <span className="float-end noti-close-btn text-muted"><i
                                                className="mdi mdi-close"></i></span>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0">
                                                    <div className="notify-icon bg-primary">
                                                        <i className="mdi mdi-comment-account-outline"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 text-truncate ms-2">
                                                    <h5 className="noti-item-title fw-semibold font-14">Datacorp <small
                                                        className="fw-normal text-muted ms-1">1 min ago</small></h5>
                                                    <small className="noti-item-subtitle text-muted">Caleb Flakelar
                                                        commented on Admin</small>
                                                </div>
                                            </div>
                                        </div>
                                    </a>


                                    <div className="text-center">
                                        <i className="mdi mdi-dots-circle mdi-spin text-muted h3 mt-0"></i>
                                    </div>
                                </div>

                                <a href="javascript:void(0);"
                                   className="dropdown-item text-center text-primary notify-item border-top py-2">
                                    View All
                                </a>

                            </div>
                        </li>


                        <li className="dropdown">
                            <a className="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown"
                               href="#" role="button" aria-haspopup="false" aria-expanded="false">

                                <div data-letters="MN"></div>
                                <span className="d-lg-flex flex-column gap-1 d-none">
                                <p className="my-0 fw-bold">Coord Onator</p>
                                <small className="my-0">Coordonator</small>
                            </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
                                <div className=" dropdown-header noti-title">
                                    <h6 className="text-overflow m-0">Dashboard</h6>
                                </div>

                                <a href="javascript:void(0);" className="dropdown-item">
                                    <i className="mdi mdi-account-circle me-1"></i>
                                    <span>My Account</span>
                                </a>

                                <a href="/logout" className="dropdown-item">
                                    <i className="mdi mdi-logout me-1"></i>
                                    <span>Logout</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="leftside-menu">

                <a href="index.html" className="logo logo-dark">
                <span className="logo-lg">
                    <img src="assets/logo-voluntariat.png" alt="Voluntariat"/>
                </span>
                    <span className="logo-sm">
                    <img src="assets/images/logo-dark-sm.png" alt="small logo"/>
                </span>
                </a>

                <div className="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right"
                     title="Show Full Sidebar">
                    <i className="ri-checkbox-blank-circle-line align-middle"></i>
                </div>

                <div className="button-close-fullsidebar">
                    <i className="ri-close-fill align-middle"></i>
                </div>

                <div className="h-100" id="leftside-menu-container" data-simplebar>
                    <div className="leftbar-user">
                        <a href="pages-profile.html">
                            <img src="assets/images/users/avatar-1.jpg" alt="user-image" height="42"
                                 className="rounded-circle shadow-sm"/>
                            <span className="leftbar-user-name mt-2">Dominic Keller</span>
                        </a>
                    </div>

                    <ul className="side-nav">

                        <li className="side-nav-title">Navigation</li>

                        <li className="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarDashboards" aria-expanded="true"
                               aria-controls="sidebarDashboards" className="side-nav-link">
                                <i className="fa fa-home"></i>
                                <span className="badge bg-success float-end">5</span>
                                <span> Dashboard </span>
                            </a>
                            <div className="" id="sidebarDashboards">
                                <ul className="side-nav-second-level">
                                    <li>
                                        <a href="dashboard-analytics.html">Analytics</a>
                                    </li>
                                    <li>
                                        <a href="index.html">Ecommerce</a>
                                    </li>
                                    <li>
                                        <a href="dashboard-projects.html">Projects</a>
                                    </li>
                                    <li>
                                        <a href="dashboard-crm.html">CRM</a>
                                    </li>
                                    <li>
                                        <a href="dashboard-wallet.html">E-Wallet</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>

                    <div className="clearfix"></div>
                </div>
            </div>

            <div className="content-page">
                <div className="content">

                    <div className="container-fluid">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;