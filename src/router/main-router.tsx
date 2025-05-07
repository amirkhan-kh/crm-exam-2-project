import { createBrowserRouter } from "react-router-dom";
import { Attendace, Clients, Employees, Profile, Salary } from "../pages";
import { AuthLayout, Dashboard, ErrorPage } from "../layout";
import App from "../App"
const children = [
    {
        path: "/",
        element: <Dashboard/>,
        children: [
            { path: "/",  element: <Profile />, },
            { path: "/employees",  element: <Employees />, },
            { path: "/smenalar", element: <Attendace/>},
            { path: "/clients", element: <Clients/>},
            { path: "/departments", element: <Salary/>}
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout/>
    },
    {
        path: "*",
        element: <ErrorPage/>
    }
]
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [...children]
    }
])