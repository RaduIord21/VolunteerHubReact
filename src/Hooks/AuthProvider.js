import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
            await api.post("/login", data)
            .then(response => {
                console.log('axios response!', response);
                setUser(data.userName);
                setToken(response.data.token);
                localStorage.setItem("site", response.data.token);
            }).catch(error => {
                // Handle error
                console.log('Error fetching data:', error);
            });
    };

    const logOut = () => {
        api.post('/logout').then(response =>{
            setUser(null);
        setToken("");
        localStorage.removeItem("site");   
        navigate("/login");
        });
        
    };

    const updateCompanyName = (companyName) => {
        setCompanyName(companyName);
    }

    return (
        <AuthContext.Provider value={{ token, user, companyName, loginAction, logOut, updateCompanyName }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};