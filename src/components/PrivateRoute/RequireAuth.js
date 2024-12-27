import React, { useContext } from 'react';
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const RequireAuth = (props) => {
    const [loggedInUser] = useContext(UserContext);
    const location = useLocation();
    return (
        <>
        {
            loggedInUser.email ? (props.children) : <Navigate to='/login' state={{ from:location.pathname }} replace={true} />
        }
        </>
    );
};

export default RequireAuth;