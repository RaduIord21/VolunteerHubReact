import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);
const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
            await axios.post(serverAddress + "/api/login", data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(response => {
                console.log('axios response', response);
                setUser(data.userName);
                // setToken(res.token);
                // localStorage.setItem("site", res.token);
                navigate("/dashboard");
            }).catch(error => {
                // Handle error
                console.log('Error fetching data:', error);
            });
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};