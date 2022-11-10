import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import AdminLayout from '../../layouts/admin/AdminLayout';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import emailjs from "emailjs-com"

const AdminPanel = (props) => {
    axios.defaults.withCredentials = true;

    const [authentificated, setAuthentificated] = useState(true);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [email_comfirmed, setEmail_comfirmed] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ADMIN_SERVER_BACKEND}/user`).then((res) => {
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setEmail(res.data.email);
            setEmail_comfirmed(res.data.email_comfirmed)
        }).catch((err) => {
            if (err) {
                console.log(err)
            }
        })
    }, [props]);


    if (!authentificated) {
        window.location.href = `${process.env.REACT_APP_LOCAL_URL}/admin-login`;
    }

    const infoSubmit = async (e) => {
        e.preventDefault();

        axios.put(`${process.env.REACT_APP_ADMIN_SERVER_BACKEND}/users/info`, {
            first_name,
            last_name,
            email
        });
    }

    const ResetPassword = async (e) => {
        e.preventDefault();

        const Secret = process.env.REACT_APP_SECRET_TOKEN + email

        const tokenData = jwt.decode(Cookies.get("jwt"))
        const payload = { AccountEmail: email, Scope: tokenData.Scope };
        const token = jwt.sign(payload, Secret, { expiresIn: '15min' });
        const link = `${process.env.REACT_APP_LOCAL_URL}/reser-password/?email=${email}&token=${token}`;

        emailjs.send(`${process.env.REACT_APP_service_id}`, `${process.env.REACT_APP_tamplate_id}`, { UserEmail: email, Link: link }, `${process.env.REACT_APP_user_id}`)
            .then(function (response) {
                window.alert("reset Password link send");
            }, function (error) {
                window.alert('FAILED...', error);
            });
    }

    const ConfirmEmail = (e) => {
        e.preventDefault();
        const Secret = process.env.REACT_APP_SECRET_TOKEN + email

        const payload = { AccountEmail: email };
        const token = jwt.sign(payload, Secret, { expiresIn: '15min' });
        const link = `${process.env.REACT_APP_LOCAL_URL}/confirm-email/?email=${email}&token=${token}`;

        emailjs.send(`${process.env.REACT_APP_service_id}`, `${process.env.REACT_APP_tamplate_id}`, { UserEmail: email, Link: link }, `${process.env.REACT_APP_user_id}`)
            .then(function (response) {
                window.alert("reset Password link send");
            }, function (error) {
                window.alert('FAILED...', error);
            });
    }

    return (
        <AdminLayout>
            <h3>Account Information</h3>
            <form onSubmit={infoSubmit}>
                <div className="mb-3">
                    <TextField label="First Name"
                        value={first_name} onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <TextField label="Last Name"
                        value={last_name} onChange={e => setLastName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <TextField label="Email"
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                    <div className='email-comfirm-div'>
                        <h5 className="mt-3">email comfirmed: {email_comfirmed.toString()}</h5>
                        <Button variant="contained" color="primary" onClick={ConfirmEmail}>Confirm Email</Button>
                    </div>
                    <br />
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </div>
                <Button variant="contained" color="primary" className="mt-3" onClick={ResetPassword}>Reset Password</Button>
            </form>

        </AdminLayout>
    );
};

export default AdminPanel;