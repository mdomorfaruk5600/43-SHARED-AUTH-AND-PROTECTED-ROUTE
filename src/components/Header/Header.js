import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import '../Header/Header.css';
import { Link } from 'react-router-dom';
import { handleSignOut } from '../Login/LoginManager';
import { UserContext } from '../../App';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to='/shop'>Shop</Link>
                <Link to='/review'>Order Review</Link>
                <Link to='/inventory'>Manage Inventory</Link>
                <button onClick={()=>setLoggedInUser({})}>Sign out</button>
            </nav>
        </div>
    );
};

export default Header;