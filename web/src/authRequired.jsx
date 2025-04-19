import { Component } from "react";
import { Navigate } from "react-router";

//this function is used to reroute the user is there is no JWT token.
const authRequired = (Component) => {


    const AuthenticatedComponent = (props) => {

        const token = localStorage.getItem("jwt-token");


        if(!token) {
            return <Navigate to="/sign-up" />
        }


        return <Component {...props} />;

    }

    return AuthenticatedComponent;

}

export default authRequired;