import { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import Resizer from 'react-image-file-resizer';
import React, { useRef } from "react";
import ModalCrop from "../../components/modalCrop";

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;

    const detail = await fetch('http://localhost:3000/api/profil/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const res = await detail.json();

    return {
        props: {
            data: res.data
        }
    }
}

export default function EditToko(props) {
    const data = props.data;
    const [dataToko, setDataToko] = useState(data);
    const [foto, setFoto] = useState(dataToko.foto);
    const [croppedFoto, setCroppedFoto] = useState(null);
    const [modal, setModal] = useState("modal");

    if (dataToko.namaToko === null) {
        setDataToko({
            ...dataToko,
            namaToko: ""
        })
    } else if (dataToko.alamat === null) {
        setDataToko({
            ...dataToko,
            alamat: ""
        })
    }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setDataToko({
            ...data,
            [name]: value
        })

    }

    const handleChangeImg = async (e) => {
        const file = e.target.files[0];
        const resize = await resizeFile(file);

        setFoto(
            resize
        )
    }

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3000/api/profil/update/' + dataToko.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                namaToko: dataToko.namaToko,
                password: dataToko.password,
                noWa: dataToko.noWa,
                alamat: dataToko.alamat,
                status: dataToko.status,
                foto: foto
            })
        }).then(() => { Router.push('/') })
    }

    const cropperRef = useRef(null);
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setCroppedFoto(cropper.getCroppedCanvas().toDataURL());
    };


    const saveCropped = () => {
        setFoto(croppedFoto);
        setModal('modal')
    }

    return (
        <>
            <Head>
                <title>Edit Toko</title>
            </Head>
            <div className="mx-5 mt-5 ">
                <button onClick={() => { Router.push('/') }} className="button green is-size-7-mobile"><i className="fas fa-arrow-left pr-2 green"></i>Kembali</button>
            </div>
            <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center masukan">
                <p>Edit Toko</p>
            </div>
            <div className="is-flex is-justify-start mx-5">
                <figure className="image is-128x128">
                    <img className="bg-white" src={foto} />
                </figure>
            </div>
            <div className="mx-5">
                <button className="button bg-green white is-small" onClick={() => { setModal('modal is-active') }}>
                    Ubah Foto
                </button>
            </div>
            {/* modal */}
            <ModalCrop foto={foto} modal={modal} saveCropped={saveCropped} handleChangeImg={handleChangeImg} cropperRef={cropperRef} onCrop={onCrop} />

            {/* modal */}
            <form onSubmit={handleSubmit.bind(this)} autoComplete="off" className="is-flex is-flex-direction-column form  my-6">
                <div className="masukan mb-2 px-5">
                    <label htmlFor="inputNama" className="label">Nama Toko</label>
                    <div className="control">
                        <input name="namaToko" onChange={handleChange.bind(this)} value={dataToko.namaToko} type="text" className="input" required />
                    </div>
                </div>
                <div className="masukan mb-2 px-5">
                    <label htmlFor="inputNama" className="label">No Wa</label>
                    <div className="control">
                        <input name="noWa" onChange={handleChange.bind(this)} value={dataToko.noWa} type="text" className="input" required />
                    </div>
                </div>
                <div className="masukan mb-2 px-5">
                    <label htmlFor="inputNama" className="label">Alamat</label>
                    <div className="control">
                        <input name="alamat" onChange={handleChange.bind(this)} value={dataToko.alamat} type="text" className="input" required />
                    </div>
                </div>
                <div className="masukan my-2 px-5">
                    <div className="control">
                        <button className="button bg-green white is-rounded" type="submit">Simpan</button>
                    </div>
                </div>
            </form>
        </>
    )

}