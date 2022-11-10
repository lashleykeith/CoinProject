import React, { useEffect, useState } from 'react';
import axios from "axios";
import AdminLayout from '../../layouts/admin/AdminLayout';

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core";

const Users = () => {
    axios.defaults.withCredentials = true;

    const [authentificated, setAuthentificated] = useState(true);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const perPage = 10;

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/accounts`).then((res) => {
            setUsers(res.data);

        }).catch((err) => {
            if (err) {
                console.log(err)
                setAuthentificated(false);
            }
        })

    }, []);

    if (!authentificated) {
        window.location.href = `${process.env.REACT_APP_LOCAL_URL}/admin-login`;

    }

    const del = async (id) => {
        if (window.confirm('Are you sure?')) {
            await axios.delete(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/users/${id}`);

            setUsers(users.filter(p => p.id !== id));
        }
    }

    return (
        <AdminLayout>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.slice(page * perPage, (page + 1) * perPage).map(user => {
                        return (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.first_name} {user.last_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary"
                                        href={`view-user?id=${user.id}`}
                                    >View</Button>
                                    <Button variant="contained" color="secondary"
                                        onClick={() => del(user.id)}
                                    >Delete</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        count={users.length}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={perPage}
                        rowsPerPageOptions={[]}
                    />
                </TableFooter>
            </Table>
        </AdminLayout>
    );
};

export default Users;
