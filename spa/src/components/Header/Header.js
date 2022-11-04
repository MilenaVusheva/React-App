import { Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';

import style from './Header.module.css'


const Header = () => {
    const { user } = useAuthContext();

    let guestNavigation = (
        <div id={style.guest}>

            <Link className={style.button} to="/">Dashboard</Link>
            <Link className={style.buttonGuest} to="/register">Register</Link>
            <Link className={style.buttonGuest} to="/login">Login</Link>

        </div>
    );

    let userNavigation = (
        <div id={style.user}>
            <span className={style.buttonGuest} >Welcome, {user.username}</span>
            <Link className={style.button} to="/">Dashboard</Link>
            <Link className={style.button} to="/my-pets">My Pets</Link>
            <Link className={style.button} to="/create">Add Pet</Link>
            <Link className={style.buttonGuest} to="/logout">Logout</Link>
        </div>
    );

    return (
        <header>
            <nav>
                {user.username
                    ? userNavigation
                    : guestNavigation
                }
            </nav>
        </header>
    );
}

export default Header;