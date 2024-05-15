import React from 'react';

const Header = () => (
    <header className="main-header">
        <div className="container">
            <nav className="navbar navbar-expand-md ">
                <a className="navbar-brand" href="/"><img src="/assets/logo-voluntariat.png" alt="" title="" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDefault" aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarsDefault">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link font-weight-bold text-white" href="/">Acasa</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link font-weight-bold text-white" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link font-weight-bold text-white" href="/register">Inregistrare</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
);

export default Header;