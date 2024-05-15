import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import background from "../../Assets/bg-13.png";
import {useAuth} from "../../Hooks/AuthProvider";
import api from "../../Hooks/api";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
const AuthContext = createContext();

//https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
const Login = (props) => {
        const [userName, setUserName] = useState('');
        const [password, setPassword] = useState('');
        const [warningTrigger, setWarningTrigger] = useState(false);
        const navigate = useNavigate();
        const handleUserNameChange = (e) => {
            setUserName(e.target.value);
        };

        const handlePasswordChange = (e) => {
            setPassword(e.target.value);
        };

        const auth = useAuth();
        const handleSubmit = (e) => {
            e.preventDefault();
            auth.loginAction({
                userName: userName,
                password: password,
                rememberMe: true,
            }).then(result => {
                console.log("login ok");
                navigate("/dashboard");
            });
            /*
                .then(response => {

                    api.get("/user")
                        .then(response => {
                        console.log(response.data);
                        localStorage.setItem('username', response.data.user);
                        localStorage.setItem('roles', response.data.roles);
                        navigate("/dashboard");
                    }).catch(error => {
                        // Handle error
                        console.log('Error fetching data:', error);
                    });
                })
                .catch(error => {
                    // Handle error
                    setWarningTrigger(true);
                    console.error('Error:', error);
                });*/
        };

        return (<>
                <Header/>
                <div>
                    <section className="banner-section" style={{backgroundImage: `url(${background})`}}>
                        <div className="d-flex justify-content-center align-items-center card-enclosure">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-center mb-4">Login</h5>
                                    <form className='px-3' onSubmit={handleSubmit}>
                                        <div className='mb-3 row'>
                                            <label htmlFor="email" className='col-sm-5 col-form-label text-nowrap'>User
                                                name</label>
                                            <div className="col-sm-7">
                                                <input
                                                    type="text"
                                                    id="email"
                                                    value={userName}
                                                    onChange={handleUserNameChange}
                                                    className='form-control'
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-3 row'>
                                            <label htmlFor="password"
                                                   className='col-sm-5 col-form-label text-nowrap'>Password</label>
                                            <div className="col-sm-7">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                    className='form-control'
                                                />
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <button type="submit" className='btn btn-primary'>Login</button>
                                        </div>
                                    </form>
                                    {warningTrigger &&
                                        <span className='text-danger'>Failed login. Check your if the email or password are correct and try again !</span>}
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                <Footer/>
            </>
        );
    }
;

export default Login;