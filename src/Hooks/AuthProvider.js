import { useContext, createContext, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [organizationId, setOrganizationId] = useState(null);
    const [role, setRole] = useState('anonymous');  //'admin', 'anonymous' , 'volunteer', 'coordinator'
    const [token, setToken] = useState(null);//localStorage.getItem("site") || "");

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };

    const updateUser = (user) => {
        setUser(user);
    }

    const updateCompanyName = (companyName) => {
        setCompanyName(companyName);
    }

    const updateOrganizationId = (organizationId) => {
        setOrganizationId(organizationId);
    }

    const updateRole = (role) => {
        setRole(role);
    }
    const updateToken = (token) => {
        setToken(token);
    }

    return (
        <AuthContext.Provider value={{ token, user, companyName, organizationId, role, login, logout, updateToken, updateUser, updateCompanyName, updateOrganizationId, updateRole }}>
            {children}
        </AuthContext.Provider>
    );

};


export const useAuth = () => {
    return useContext(AuthContext);
};

