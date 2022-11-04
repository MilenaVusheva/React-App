import { useNavigate } from 'react-router';

import * as authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';

import style from './Register.module.css'

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const registerSubmitHandler = (e) => {
        e.preventDefault();

        let { username, email, password } = Object.fromEntries(new FormData(e.currentTarget));

        authService.register(username, email, password)
            .then(authData => {
                login(authData);

                navigate('/');
            });
    }

    return (
        // <section className={style.registerPage}>
            <form className={style.form}  onSubmit={registerSubmitHandler}>
                <fieldset>
                    <legend className={style.legend} >Register Form</legend>
                    <p className="field">
                        {/* <label htmlFor="username">Username</label> */}
                        <span className="input">
                            <input type="text" name="username" id="username" placeholder="username" />
                        </span>
                    </p>
                    <p className="field">
                        {/* <label htmlFor="email">Email</label> */}
                        <span className="input">
                            <input type="text" name="email" id="email" placeholder="email" />
                        </span>
                    </p>
                    <p className="field">
                        {/* <label htmlFor="password">Password</label> */}
                        <span className="input">
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </span>
                    </p>
                    <p className="field">
                        {/* <label htmlFor="repeat-pass">Repeat Password</label> */}
                        <span className="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password" />
                        </span>
                    </p>
                    <input className={style.submit} type="submit" value="Register" />
                </fieldset>
            </form>
        // </section>
    );
}

export default Register;