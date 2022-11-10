import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, TextField, Input } from "@material-ui/core";
import axios from "axios";
import * as cookie from 'cookie'
import AdminLayout from '../../../../layouts/admin/AdminLayout';


const EditProductsTags = ({ location }) => {
    axios.defaults.withCredentials = true;

    const [productData, setProductData] = useState([])
    const [title, setTitle] = useState('');
    const [mint, setMint] = useState('');
    const [year, setYear] = useState('');
    const [weight, setWeight] = useState('');
    const [metal, setMetal] = useState('');
    const [collection, setCollection] = useState('');
    const [commemorative, setCommemorative] = useState('');
    const [novelty, setNovelty] = useState('');
    const [thisYear, setThisYear] = useState((new Date()).getFullYear())

    const options = [];

    for (let i = 0; i <= 60; i++) {
        const year = thisYear - i;
        options.push(<option value={year}>{year}</option>);
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('id');

        axios.get(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/get-tag/${id}`).then((res => {

            setProductData(res.data)
            setTitle(res.data.tagname);
            setMint(res.data.mint)
            setYear(res.data.year)
            setWeight(res.data.weight)
            setMetal(res.data.metal)
            setCollection(res.data.collection)
            setCommemorative(res.data.commemorative)
            setNovelty(res.data.novelty)
        })).catch((err) => {
            if (err) {
                console.log(err)
            }
        })

    }, [location.search])


    const submit = async (e) => {
        e.preventDefault();

        let formData = new FormData();

        if (mint === "") {
            formData.append("mint", "none");

        } else {
            formData.append("mint", mint);
        }

        if (weight === "") {
            formData.append("weight", "none");

        } else {
            formData.append("weight", weight);
        }

        if (collection === "") {
            formData.append("collection", "none");
        } else {
            formData.append("collection", collection);
        }

        if (commemorative === "") {
            formData.append("commemorative", "none");
        } else {
            formData.append("commemorative", commemorative);
        }

        if (novelty === "") {
            formData.append("novelty", "none");
        } else {
            formData.append("novelty", novelty);
        }

        formData.append("tagname", title);
        formData.append("year", year);
        formData.append("metal", metal);

        axios.put(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/update-tag/${productData.id}`, formData).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            if (err) {
                console.log(err)
            }
        })
    }

    return (
        <AdminLayout>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <TextField label="Title"
                        value={title} onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <h4>Coin Year</h4>
                    <select value={year} onChange={e => { setYear(e.target.value); }}>
                        <option selected="selected" value={"none"}>None</option>
                        {options}
                    </select>
                </div>

                <div className="mt-4">
                    <h4>Coin Weight</h4>
                    <TextField
                        defaultValue="1oz"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }} />
                </div>
                <div className="mt-4">
                    <h4>Coin Mint</h4>
                    <TextField
                        defaultValue="1oz"
                        value={mint}
                        onChange={e => setMint(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }} />
                </div>
                <div className="mt-4">
                    <h4>Coin Metal</h4>
                    <select value={metal} onChange={e => { setMetal(e.target.value); }}>
                        <option selected="selected" value={"none"}>None</option>
                        <option value={"gold"}>Gold</option>
                        <option value={"silver"}>Silver</option>
                        <option value={"platinum"}>Platinum</option>
                        <option value={"palladium"}>Palladium</option>
                    </select>
                </div>

                <div className="mt-4">
                    <h4>Coin Collection</h4>
                    <select value={collection} onChange={e => { setCollection(e.target.value); }}>
                        <option selected="selected" value={"none"}>None</option>
                        <option value={"American Eagle"}>American Eagle</option>
                        <option value={"American Buffalo"}>American Buffalo</option>
                        <option value={"Maple Leaf"}>Maple Leaf</option>
                        <option value={"Kennedy Half Dollars"}>Kennedy Half Dollars</option>
                    </select>
                </div>

                <div className="mt-4">
                    <h4>Coin Commemorative</h4>
                    <TextField
                        defaultValue="none"
                        value={commemorative}
                        onChange={e => setCommemorative(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }} />
                </div>
                <div className="mt-4">
                    <h4>Coin Novelty</h4>
                    <TextField
                        defaultValue="none"
                        value={novelty}
                        onChange={e => setNovelty(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }} />
                </div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </AdminLayout>
    );
};

export default EditProductsTags;
