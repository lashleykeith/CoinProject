import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie'
import AdminLayout from '../../../../layouts/admin/AdminLayout';

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
import { ToggleButtonGroup } from "@material-ui/lab";

const ProductsTags = () => {
    axios.defaults.withCredentials = true;
    const [tags, setTags] = useState([]);
    const [page, setPage] = useState(0);
    const perPage = 10;


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_AMBASSADORS_SERVER_BACKEND}/alltags`).then((res) => {
            setTags(res.data);
            console.log(res.data)

        }).catch((err) => {
            if (err) {

                console.log(err)
            }
        })
    }, []);


    const del = async (id) => {
        if (window.confirm('Are you sure?')) {
            await axios.delete(`${process.env.REACT_APP_ADMIN_SERVER_BACKEND}/products/${id}`);

            setTags(tags.filter(p => p.id !== id));
        }
    }

    return (
        <AdminLayout>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Button href={'/admin-tags-create'} variant="contained" color="primary">Add</Button>
            </div>


            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>TagName</TableCell>
                        <TableCell>PresetCoins</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Mint</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Metal</TableCell>
                        <TableCell>Collection</TableCell>
                        <TableCell>Commemorative</TableCell>
                        <TableCell>Novelty</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tags.slice(page * perPage, (page + 1) * perPage).map(tag => {
                        return (
                            <TableRow key={tag.id}>
                                <TableCell>{tag.id}</TableCell>
                                <TableCell>{tag.tagname}</TableCell>
                                <TableCell>{tag.id}</TableCell>
                                <TableCell>{tag.year}</TableCell>
                                <TableCell>{tag.mint}</TableCell>
                                <TableCell>{tag.weight}</TableCell>
                                <TableCell>{tag.metal}</TableCell>
                                <TableCell>{tag.collection}</TableCell>
                                <TableCell>{tag.commemorative}</TableCell>
                                <TableCell>{tag.novelty}</TableCell>
                                <TableCell>{tag.price}</TableCell>
                                <TableCell>
                                    <ToggleButtonGroup>
                                        <Button variant="contained" color="primary"
                                            href={`/admin-edit-tags?id=${tag.id}`}
                                        >Edit</Button>
                                        <Button variant="contained" color="secondary"
                                            onClick={() => del(tag.id)}
                                        >Delete</Button>
                                    </ToggleButtonGroup>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        count={tags.length}
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

export default ProductsTags;
