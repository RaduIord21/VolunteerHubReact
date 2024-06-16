import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import background from "../../Assets/bg-13.png";
import {useAuth} from "../../Hooks/AuthProvider";
import useAxios from "../../Hooks/useAxios";

//https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
const Login = () => {
        const [userName, setUserName] = useState('');
        const [password, setPassword] = useState('');
        const [warningTrigger, setWarningTrigger] = useState(false);
        const navigate = useNavigate();
        const {login, updateUser} = useAuth();
        const axiosInstance = useAxios();
        const handleUserNameChange = (e) => {
            setUserName(e.target.value);
        };
        const handlePasswordChange = (e) => {
            setPassword(e.target.value);
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log('login submit');
            await axiosInstance.post("/login", {
                userName: userName,
                password: password,
                rememberMe: true,
            }).then(response => {
                console.log(response, "login ok");
                login(response.data.token);
                updateUser(userName);
                navigate("/dashboard");
            }).catch(error => {
                // Handle error
                console.log(error, "login error");
                setWarningTrigger(true);
            });
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