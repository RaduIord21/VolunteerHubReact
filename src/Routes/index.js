//https://najm-eddine-zaga.medium.com/react-render-multiple-layouts-with-react-router-dom-v6-7a42bd984acf
// Layouts
import {renderRoutes} from "./generate-routes";
import HomeLayout from "../Layouts/HomeLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
// Pages
import Home from '../Pages/Home/Home'
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Organization from "../Pages/Organization/Organization";
import CreateOrganization from "../Pages/Organization/CreateOrganization";
import SelectOrganization from "../Pages/Organization/SelectOrganization";
import Projects from "../Pages/Projects/Projects";
import Project from "../Pages/Projects/Project";
import CreateProject from "../Pages/Projects/CreateProject";
import MyOrganization from "../Pages/Organization/MyOrganization";
import AssignTask from "../Pages/Tasks/AsignTask";
import Tasks from "../Pages/Tasks/Tasks";
import CreateTask from "../Pages/Tasks/CreateTask";
import JoinOrganization from "../Pages/Organization/JoinOrganization";
import TaskMembers from "../Pages/Tasks/TaskMembers";

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
            },
            
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
                        path: '/create-organization'
                    },
                    {
                        name: 'my-organization',
                        title: 'my organization',
                        hasSiderLink: true,
                        component: MyOrganization,
                        path: '/my-organization'
                    },
                    {
                        name: 'join-organization',
                        title: 'join organization',
                        hasSiderLink: true,
                        component: JoinOrganization,
                        path: '/join-organization'
                    }
                ]
            },
            {
                name: 'project',
                title: 'Project',
                hasSiderLink: true,
                routes: [
                    {
                        name: 'projects',
                        title: 'Proiectele mele',
                        hasSiderLink: true,
                        component: Projects,
                        path: '/projects'
                    },
                    {
                        name: 'create-project',
                        title: 'Proiect nou',
                        hasSiderLink: true,
                        component: CreateProject,
                        path: '/create-project',
                        isPublic: true,
                    },
                    {
                        name: 'project-details',
                        title: 'Project details',
                        hasSiderLink: true,
                        component: Project,
                        path: '/project/:id'
                    }
                ]
            },{
                name: 'tasks',
                title: 'tasks',
                hasSiderLink: true,
                routes: [
                    {
                        name: 'tasks',
                        title: 'Taskurile mele',
                        hasSiderLink: true,
                        component: Tasks,
                        path: '/tasks/:id'
                    },
                    {
                        name: 'create-tasks',
                        title: 'Creeaza Taskuri',
                        hasSiderLink: true,
                        component: CreateTask,
                        path: '/create-task/:id'
                    },
                    {
                        name: 'assign-task',
                        title: 'Atribuie task',
                        hasSiderLink: true,
                        component: AssignTask,
                        path: '/assign-task/:id'
                    },
                    {
                        name: 'task-members',
                        title: 'Membri',
                        hasSiderLink: true,
                        component: TaskMembers,
                        path: '/tasks/:id/taskmembers'
                    }
                ]
            }
        ]
    }
];

export const Routes = renderRoutes(routes);
