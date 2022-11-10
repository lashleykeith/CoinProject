import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import axios from "axios"

const ResetPassword = ({ location }) => {
    axios.defaults.withCredentials = true;

    const [Linkvalid, setLinkValid] = useState(true);
    const [email, setEmail] = useState("");
    const [scope, setScope] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const token = params.get('token');
        setEmail(params.get('email'));

        try {
            const secret = process.env.REACT_APP_SECRET_TOKEN + params.get('email')
            const payload = jwt.verify(token, secret)
            setScope(jwt.decode(Cookies.get("jwt")));

        } catch (err) {
            console.log(err)
            if (err) {
                return setLinkValid(false);
            }
        }



    }, [])

    const SubmitResetPwd = e => {
        e.preventDefault();

        if (e.target.password.value !== e.target.RepeatPassword.value) {
            return window.alert("passwords don't match");
        }

        if (scope == "super_admin") {
            axios.put(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/users/password`, {
                password: e.target.password.value,
                password_confirm: e.target.RepeatPassword.value
            }).catch((err) => {
                console.log(err)
            })
        } else {
            axios.put(`${process.env.REACT_APP_AMBASSADORS_SERVER_BACKEND}/users/password`, {
                password: e.target.password.value,
                password_confirm: e.target.RepeatPassword.value
            }).catch((err) => {
                console.log(err)
            })
        }
    }


    return (
        <div >
            {Linkvalid ? (
                <form onSubmit={SubmitResetPwd}>
                    <div>
                        <h1>Change account password</h1>
                        <hr color="#676767" />
                        <div>
                            <h1>Password</h1>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                        </div>

                        <div>
                            <h1>Reapeat Password:</h1>
                            <input
                                type="password"
                                placeholder="User Name..."
                                name="RepeatPassword"
                                minLength="5"
                            />
                        </div>
                        <hr color="#676767" />
                        <div >
                            <input type="submit" value="Change Password" />
                        </div>
                    </div>
                </form>

            ) : (
                <div><h1>Invalid Link</h1></div>
            )
            }

        </div >
    )
}

export default ResetPassword