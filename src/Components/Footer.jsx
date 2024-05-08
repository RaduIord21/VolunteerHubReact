import React from 'react';

const Footer = () => (
    <footer className="main-footer">
    <div className="auto-container">

        <div className="widgets-section">
            <div className="row clearfix">

                <div className="big-column col-lg-6 col-md-12 col-sm-12">
                    <div className="footer-widget logo-widget">
                        <div className="logo">
                            <a href="/"><img
                                src="/assets/logo-voluntariat-light.png" alt="" className="img img-fluid"/></a>
                        </div>
                        <div className="text">Participă la proiecte de voluntariat care fac diferența.
                            Conectează-te cu oameni dedicați și adaugă-ți contribuția pentru a crea o comunitate mai
                            bună.
                        </div>

                    </div>
                </div>

                <div className="big-column col-lg-3 col-md-12 col-sm-12">
                </div>

                <div className="big-column col-lg-3 col-md-12 col-sm-12">
                    <div className="footer-widget links-widget">
                        <h4>Contact</h4>
                        <ul className="list-style-one">
                            <li><span className="icon fa fa-phone"></span> +123 (4567) 890</li>
                            <li><span className="icon fa fa-envelope"></span> info@voluntariat.com</li>
                            <li><span className="icon fa fa-home"></span>Craiova
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div className="footer-bottom">
        <div className="auto-container">
            <div className="inner-container">
                <div className="row clearfix">

                    <div className="copyright-column col-lg-6 col-md-6 col-sm-12">
                    </div>

                    <div className="social-column col-lg-6 col-md-6 col-sm-12">
                        <ul>
                            <div className="copyright">2024© Universitatea Din Craiova</div>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </div>
</footer>
);

export default Footer;