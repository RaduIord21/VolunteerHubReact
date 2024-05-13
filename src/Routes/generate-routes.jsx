import flattenDeep from 'lodash/flattenDeep';
import React from 'react';
import {Route, Routes as ReactRoutes} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import {useAuth} from "../Hooks/AuthProvider";

const generateFlattenRoutes = (routes) => {
    if (!routes) return [];
    return flattenDeep(routes.map(({ routes: subRoutes, ...rest }) => [rest, generateFlattenRoutes(subRoutes)]));
}

export const renderRoutes = (mainRoutes) => {
    return ({isAuthorized}) => {
        const layouts = mainRoutes.map(({layout: Layout, routes}, index) => {
            const auth = useAuth();
            const isAuthorized = !!(auth?.user);
            console.log("auth.user isAuthorized", isAuthorized);

            const subRoutes = generateFlattenRoutes(routes);
            return (
                <Route key={index} element={<Layout/>}>
                    {subRoutes.map(({component: Component, path, name, isPublic}) => {
                        return (
                            <Route
                                key={name}
                                element={
                                    <ProtectedRoute
                                        isAuthorized={isAuthorized}
                                        isPublic={isPublic}
                                    />
                                }
                            >
                                {Component && path && (
                                    <Route element={<Component/>} path={path}/>
                                )}
                            </Route>
                        );
                    })}
                </Route>
            );
        });
        return <ReactRoutes>{layouts}</ReactRoutes>;
    };
};
