import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import Cookies from 'js-cookie'
import AdminLayout from '../../../../layouts/admin/AdminLayout';


const CreateTag = () => {
    axios.defaults.withCredentials = true;

    const [title, setTitle] = useState('');
    const [mint, setMint] = useState('');
    const [year, setYear] = useState('none');
    const [weight, setWeight] = useState('');
    const [metal, setMetal] = useState('none');
    const [collection, setCollection] = useState('');
    const [commemorative, setCommemorative] = useState('');
    const [novelty, setNovelty] = useState('');
    const [thisYear, setThisYear] = useState((new Date()).getFullYear())


    const submit = async (e) => {
        e.preventDefault();

        let CoinMint = mint
        let CoinWeight = weight
        let CoinMetal = metal
        let CoinCollection = collection
        let CoinCommemorative = commemorative
        let CoinNovelty = novelty

        if (CoinMint == "") {
            CoinMint = "none"
        }

        if (CoinWeight == "") {
            CoinWeight = "none"
        }

        if (CoinMetal == "none") {
            CoinMetal = "none"
        }

        if (CoinCollection == "") {
            CoinCollection = "none"
        }

        if (CoinCommemorative == "") {
            CoinCommemorative = "none"
        }

        if (CoinNovelty == "") {
            CoinNovelty = "none"
        }

        await axios.post(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/create-tag`, {
            title: title,
            year: year,
            mint: CoinMint,
            weight: CoinWeight,
            metal: CoinMetal,
            collection: CoinCollection,
            commemorative: CoinCommemorative,
            novelty: CoinNovelty,

        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const options = [];

    for (let i = 0; i <= 60; i++) {
        const year = thisYear - i;
        options.push(<option value={year}>{year}</option>);
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
                        value={commemorative}
                        onChange={e => setCommemorative(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }} />
                </div>

                <div className="mt-4">
                    <h4>Coin Novelty</h4>
                    <TextField
                        defaultValue="1oz"
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

export default CreateTag;
