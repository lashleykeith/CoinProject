import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import axios from "axios"

const ConfirmEmail = ({ location }) => {
    axios.defaults.withCredentials = true;

    const [Linkvalid, setLinkValid] = useState(true);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const token = params.get('token');
        setEmail(params.get('email'));

        try {
            const secret = process.env.REACT_APP_SECRET_TOKEN + params.get('email')
            const payload = jwt.verify(token, secret)

        } catch (err) {
            console.log(err)
            if (err) {
                return setLinkValid(false);
            }
        }



    }, [])

    const SubmitResetPwd = e => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_AMBASSADORS_SERVER_BACKEND}/confirm-user-email`, { AccountEmail: email })
            .then((res) => {
                if (res.data.error) {
                    return window.alert(`an error has ocured: ${res.data.msg}`);
                }

                // Cookies.remove("UserToken");

                return window.alert("email succesfully confirmed");
            }).catch((err) => {
                if (err) {
                    console.log(err);
                }
            })
    }


    return (
        <div >
            {Linkvalid ? (
                <form onSubmit={SubmitResetPwd}>
                    <div>
                        <h1>Confirm Email: {email}</h1>
                        <div >
                            <input type="submit" value="Confirm Email" />
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

export default ConfirmEmail