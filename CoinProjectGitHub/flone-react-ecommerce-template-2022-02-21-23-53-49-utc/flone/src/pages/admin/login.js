import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        await axios.post(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/login`, {
            email,
            password
        }).then((res) => {
            console.log(res.data.cookie)
            if (res.data.scope === "super_admin") {

                Cookies.set("jwt", res.data.cookie_value, { expires: 99999 })

                window.location.href = "http://localhost:3000/admin";
            } else {
                window.location.href = "http://localhost:3000/user";
            }
        }).catch((err) => {
            console.log(err);
        })

    }

    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="mt-4">Please sign in</h1>
                <br />
                <div className="box-field">
                    <label htmlFor="floatingInput">Email address</label>
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <br />
                <div className="box-field">
                    <label htmlFor="floatingPassword">Password</label>
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </main>
    );
};

export default Login;
