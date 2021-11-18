import { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Route } from "react-router";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={
        props=>isAuthenticated===true?(
            <Component {...props}/>
        ):(
            <Navigate to="/"/>
        )
    }/>
);

const mapStateToProps=(state)=>({
    isAuthenticated:state.userReducer.isAuthenticated,
});

export default connect(mapStateToProps,null)(PrivateRoute);
