import React, { useEffect, useState } from 'react';
import axios from "axios";
import AdminLayout from '../../../layouts/admin/AdminLayout';


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

const ProductImage = (props) => {

    const [hasFaceImageUrl, setHasFaceImageUrl] = useState(false)


    useEffect(() => {
        if (props.product.faceImage.includes("http") || props.product.faceImage.includes("data:")) {
            setHasFaceImageUrl(true)
        } else {
            setHasFaceImageUrl(false)
        }
    }, []);

    return (
        <>
            {hasFaceImageUrl ? (
                <img src={props.product.facImage} className='js-img' alt='' width={50} />
            ) : (
                <img src={`http://localhost:8000/api/ambassador/image/${props.product.id}`} width={50} />
            )}
        </>
    )
}

const Products = (props) => {
    axios.defaults.withCredentials = true;

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const perPage = 10;


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/allproducts`).then((res) => {
            setProducts(res.data);
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

            setProducts(products.filter(p => p.id !== id));
        }
    }

    return (
        <AdminLayout>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Button href={'/admin-products-create'} variant="contained" color="primary">Add</Button>
                <Button href={'/admin-products-tags'} variant="contained" color="primary" className="ml-5">Tags</Button>
            </div>


            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Mint</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Metal</TableCell>
                        <TableCell>Collection</TableCell>
                        <TableCell>Commemorative</TableCell>
                        <TableCell>Novelty</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>In Stock</TableCell>
                        <TableCell>In Sale</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.slice(page * perPage, (page + 1) * perPage).map(product => {
                        return (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell><ProductImage product={product} /></TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.year}</TableCell>
                                <TableCell>{product.mint}</TableCell>
                                <TableCell>{product.weight}</TableCell>
                                <TableCell>{product.metal}</TableCell>
                                <TableCell>{product.collection}</TableCell>
                                <TableCell>{product.commemorative}</TableCell>
                                <TableCell>{product.novelty}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{String(product.in_stock)}</TableCell>
                                <TableCell>{String(product.is_sale)}</TableCell>
                                <TableCell>
                                    <ToggleButtonGroup>
                                        <Button variant="contained" color="primary"
                                            href={`/admin-products-edit?id=${product.id}`}
                                        >Edit</Button>
                                        <Button variant="contained" color="secondary"
                                            onClick={() => del(product.id)}
                                        >Delete</Button>
                                    </ToggleButtonGroup>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        count={products.length}
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

export default Products;
