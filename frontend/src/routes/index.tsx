/* eslint-disable */
import App from "../pages/App";
import Error from "../pages/Error";
import * as  Router from "react-router-dom";

export default [
    { path: '*', element: <Error previous={-1} /> },
    { path: '/', element: <App /> }
] as Router.RouteProps[];