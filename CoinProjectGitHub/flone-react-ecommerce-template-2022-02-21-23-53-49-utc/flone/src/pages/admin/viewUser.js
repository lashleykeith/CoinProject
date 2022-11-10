import React, { useEffect, useState } from 'react';
import axios from "axios";
import AdminLayout from '../../layouts/admin/AdminLayout';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import emailjs from "emailjs-com"

const AdminPanelViewUser = ({ location }) => {
    axios.defaults.withCredentials = true;

    const [userData, setUserData] = useState([]);

    useEffect(() => {

        const params = new URLSearchParams(location.search);

        const id = params.get('id');

        axios.get(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/user/data/${id}`).then((res) => {
            setUserData(JSON.parse(res.data))
            console.log(JSON.parse(res.data))
        }).catch((err) => {
            if (err) {
                console.log(err)
            }
        })

    }, []);

    const promote = () => {
        axios.post(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/promote`, {
            // userId: router.query.id
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            if (err) {
                console.log(err)
            }
        })
    }


    const ResetUserPassword = async (e) => {
        e.preventDefault();

        const Secret = process.env.REACT_APP_SECRET_TOKEN + userData.email

        const tokenData = jwt.decode(Cookies.get("jwt"))
        const payload = { AccountEmail: userData.email, Scope: tokenData.Scope };
        const token = jwt.sign(payload, Secret, { expiresIn: '15min' });
        const link = `${process.env.REACT_APP_LOCAL_URL}/reser-password/?email=${userData.email}&token=${token}`;

        emailjs.send(`${process.env.REACT_APP_service_id}`, `${process.env.REACT_APP_tamplate_id}`, { UserEmail: userData.email, Link: link }, `${process.env.REACT_APP_user_id}`)
            .then(function (response) {
                window.alert("reset Password link send");
            }, function (error) {
                window.alert('FAILED...', error);
            });
    }

    return (
        <AdminLayout>
            <div className='account-info-container'>
                <h2 className='account-info-title'>Account info:</h2>
                <h4 className='account-info-text ml1'>First Name: {userData.first_name}</h4>
                <h4 className='account-info-text ml1'>Last Name: {userData.last_name}</h4>
                <h4 className='account-info-text ml1'>user email: {userData.email}</h4>
                <h4 className='account-info-text ml1'>user email confirmed: {String(userData.email_comfirmed)}</h4>
                <div className='account-info-promote-container'>
                    <button className='account-info-promote-btnx`' onClick={promote}>promote</button>
                    <button className='mt-3`' onClick={ResetUserPassword}>Reset User Password</button>
                </div>
            </div>

        </AdminLayout>
    );
};

export default AdminPanelViewUser;
