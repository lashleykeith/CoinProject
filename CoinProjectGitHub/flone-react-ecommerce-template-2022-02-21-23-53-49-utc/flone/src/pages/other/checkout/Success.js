import React, { useEffect } from 'react';
import axios from "axios";
import emailjs from "emailjs-com"

const Success = ({ location }) => {

    useEffect(() => {

        const params = new URLSearchParams(location.search);
        let source = params.get('source');
        let adminEmail = params.get('email');
        let userName = params.get('userName');


        if (source !== undefined) {
            (
                async () => {
                    await axios.post(`${process.env.REACT_APP_API_CHECKOUT}/orders/confirm`, {
                        source
                    }).then((res) => {
                        emailjs.send(`${process.env.REACT_APP_service_id}`, `${process.env.REACT_APP_order_tamplate_id}`, { AdminEmail: adminEmail, UserName: userName }, `${process.env.REACT_APP_user_id}`)
                            .then(function (response) {
                            }, function (error) {
                            });
                    }).catch((err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            )()
        }


    }, []);

    return (
        <>
            <div className="py-5 text-center">
                <h2>Success</h2>
                <p className="lead">Your purchase has been completed!</p>
            </div>
        </>
    );
};

export default Success;
