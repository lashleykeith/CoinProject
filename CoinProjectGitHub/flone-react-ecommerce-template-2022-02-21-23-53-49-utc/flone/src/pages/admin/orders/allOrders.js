import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as cookie from 'cookie'
import AdminLayout from '../../../layouts/admin/AdminLayout';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";

const AdminOrders = () => {
    axios.defaults.withCredentials = true;
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/allorders`).then((res) => {
            console.log(res.data)
            setOrders(res.data)
            if (res.data.message == "unauthenticated") {
                window.location.href = `${process.env.REACT_APP_LOCAL_URL}/admin-login`;
            }

            if (res.data.message == "unauthorized") {
                window.location.href = `${process.env.REACT_APP_LOCAL_URL}/admin-login`;
            }
        }).catch((err) => {
            if (err) {
                console.log(err)
            }
        })

        console.log(orders)



    }, []);


    return (
        <AdminLayout>
            {orders.map(order => {
                return (
                    <Accordion key={order.id}>
                        <AccordionSummary>
                            {order.name} ${order.total}
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Product Title</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Usa Mail Address</TableCell>
                                        <TableCell>PhoneNumber</TableCell>
                                        <TableCell>Customer Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.order_items.map(item => {
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell>{item.product_title}</TableCell>
                                                <TableCell>{item.price}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>{order.usa_address}</TableCell>
                                                <TableCell>{order.phoneNumber}</TableCell>
                                                <TableCell>{order.email}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </AdminLayout>
    );
};

export default AdminOrders;
