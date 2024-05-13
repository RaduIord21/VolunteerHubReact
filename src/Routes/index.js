//https://najm-eddine-zaga.medium.com/react-render-multiple-layouts-with-react-router-dom-v6-7a42bd984acf
// Layouts
import {renderRoutes} from "./generate-routes";
import HomeLayout from "../Layouts/HomeLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
// Pages
import Organization from "../Pages/Organization/Organization";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Home from '../Pages/Home/Home'
import Dashboard from "../Pages/Dashboard/Dashboard";
import CreateOrganization from "../Pages/Organization/CreateOrganization";
import SelectOrganization from "../Pages/Organization/SelectOrganization";

export const routes = [
    {
        layout: HomeLayout,
        routes: [
            {
                name: 'home',
                title: 'Home page',
                component: Home,
                path: '/'
            },
            {
                name: 'login',
                title: 'login',
                component: Login,
                path: '/login',
                isPublic: true,
            },
            {
                name: 'register',
                title: 'Register',
                component: Register,
                path: '/register',
                isPublic: true,
            }
        ]
    },
    {
        layout: DashboardLayout,
        routes: [
            {
                name: 'dashboard',
                title: 'Dashboard page',
                component: Dashboard,
                path: '/dashboard',
                isPublic: true,
            },
            {
                name: 'organization',
                title: 'Organization',
                hasSiderLink: true,
                routes: [
                    {
                        name: 'organization',
                        title: 'Organization',
                        hasSiderLink: true,
                        component: Organization,
                        path: '/organization'
                    },
                    {
                        name: 'select-organization',
                        title: 'Select Organization',
                        hasSiderLink: true,
                        component: SelectOrganization,
                        path: '/select-organization',
                        isPublic: true,
                    },
                    {
                        name: 'create-organization',
                        title: 'Create organization',
                        hasSiderLink: true,
                        component: CreateOrganization,
                        path: '/createOrganization'
                    }
                ]
            }
        ]
    }
];

export const Routes = renderRoutes(routes);
