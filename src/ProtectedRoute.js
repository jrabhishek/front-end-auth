import React ,{useContext}from "react";
import { Route, Redirect } from "react-router-dom";
import {AuthContext} from "./App";

function PrivateRoute({ component: Component, ...rest }) {
    const { authTokens,setAuthTokens } = useContext(AuthContext);

    const getToken = () => {
         if(authTokens!=null)
             return authTokens;
         else{
        const t= localStorage.getItem("token");
        setAuthTokens(t);
        return t;}

    }
    return (
        <Route
            {...rest}
            render={props =>
                getToken() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={'/login'}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;
