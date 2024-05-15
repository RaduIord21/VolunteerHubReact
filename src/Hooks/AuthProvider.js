import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
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