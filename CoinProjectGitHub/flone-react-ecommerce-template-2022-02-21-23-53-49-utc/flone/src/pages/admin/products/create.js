import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import Cookies from 'js-cookie'
import AdminLayout from '../../../layouts/admin/AdminLayout';


const CreateProducts = () => {
    axios.defaults.withCredentials = true;

    const [productData, setProductData] = useState([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [faceChoice, setFaceChoice] = useState('link');
    const [backChoice, setBackChoice] = useState('link');
    const [faceimage, setFaceImage] = useState('');
    const [backimage, setBackimage] = useState('');
    const [faceFile, setFaceFile] = useState(null);
    const [backFile, setBackFile] = useState(null);
    const [mint, setMint] = useState('');
    const [year, setYear] = useState('');
    const [weight, setWeight] = useState('');
    const [metal, setMetal] = useState('');
    const [collection, setCollection] = useState('');
    const [commemorative, setCommemorative] = useState('');
    const [novelty, setNovelty] = useState('');
    const [isSale, setIsSale] = useState(true);
    const [inStock, setInStock] = useState(0);
    const [price, setPrice] = useState(0);

    const submit = async (e) => {
        e.preventDefault();

        let formData = new FormData();


        if (faceFile == null) {
            formData.append("faceImage", faceimage);
        } else {

            console.log(faceFile[0])
            formData.append("faceFile", faceFile[0]);
        }

        if (backFile == null) {
            formData.append("backImage", backimage);
        } else {

            console.log(backFile[0])
            formData.append("backFile", backFile[0]);
        }


        formData.append("title", title);
        formData.append("description", description);
        formData.append("year", year);
        formData.append("mint", mint);
        formData.append("weight", weight);
        formData.append("metal", metal);
        formData.append("collection", collection);
        formData.append("commemorative", commemorative);
        formData.append("novelty", novelty);
        formData.append("price", Number(price));


        const config = {
            header: { 'content-type': 'multipart/formdata' },
        }

        await axios.post(`${process.env.REACT_APP_SUPER_ADMIN_SERVER_BACKEND}/products`, formData, config).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
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
                <div className="mb-3">
                    <TextField label="Description" rows={4} multiline
                        value={description} onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="selector">
                    <div className="selector-head">
                        <h4 className="selector-text">Coin face image method:</h4>
                        <select name="image" onChange={(e) => setFaceChoice(e.target.value)} >
                            <option value="link">Link</option>
                            <option value="file">File</option>
                        </select>
                    </div>
                    <div className="mt-5">
                        <div>
                            <TextField label="Image"
                                value={faceimage} onChange={e => setFaceImage(e.target.value)}
                            />
                        </div>
                        <div>
                            <input className='UploadInput' type="file" id="VideoFile" onChange={(e) => { setFaceFile(e.target.files); }} accept=".jpg, .png" />

                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="selector">
                    <div className="selector-head">
                        <h4 className="selector-text">Coin back image method:</h4>
                        <select name="image" onChange={(e) => setBackChoice(e.target.value)} >
                            <option value="link">Link</option>
                            <option value="file">File</option>
                        </select>
                    </div>
                    <div className="mt-5">
                        <div>
                            <TextField label="Image"
                                value={backimage} onChange={e => setBackimage(e.target.value)}
                            />
                        </div>
                        <div>
                            <input className='UploadInput' type="file" id="VideoFile" onChange={(e) => { setBackFile(e.target.files); }} accept=".jpg, .png" />

                        </div>
                    </div>
                </div>

                <div>
                    <h4>Coin Year</h4>
                    <TextField
                        type="date"
                        defaultValue="2017-05-24"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }} />
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
                        defaultValue="United States Mint"
                        value={mint}
                        onChange={e => setMint(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }} />
                </div>
                <div className="mt-4">
                    <h4>Coin Metal</h4>
                    <TextField
                        value={metal}
                        onChange={e => setMetal(e.target.value)}
                        defaultValue="silver"
                        InputLabelProps={{
                            shrink: true
                        }} />
                </div>

                <div className="mt-4">
                    <h4>Coin Collection</h4>
                    <TextField
                        value={collection}
                        onChange={e => setCollection(e.target.value)}
                        defaultValue="American Eagle"
                        InputLabelProps={{
                            shrink: true
                        }} />
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
                        value={novelty}
                        onChange={e => setNovelty(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }} />
                </div>
                <div className="mb-3 mt-5">
                    <TextField label="Price" type="number"
                        value={price} onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </AdminLayout>
    );
};

export default CreateProducts;
