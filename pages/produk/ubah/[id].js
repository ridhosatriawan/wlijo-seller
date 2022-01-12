import Router from "next/router";
import Head from "next/head";
import { useState, useRef } from "react";
import Resizer from 'react-image-file-resizer';
import ModalCrop from '../../../components/modalCrop';
import cookies from "next-cookies";

export async function getServerSideProps(ctx) {
    const { token } = cookies(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const { id } = ctx.query
    const req = await fetch('http://localhost:3000/api/produk/detail/' + id);
    const res = await req.json();

    return {
        props: {
            data: res
        }
    }
}

export default function EditProduk(props) {
    const [dataProduk, setDataProduk] = useState(props.data.data);
    const [foto, setFoto] = useState(dataProduk.foto);
    const [croppedFoto, setCroppedFoto] = useState(null);
    const [modal, setModal] = useState("modal");

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setDataProduk({
            ...dataProduk,
            [name]: value
        })
    }

    async function handleChangeImg(e) {
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
                150,
                150,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

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

    function handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3000/api/produk/update/' + dataProduk.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: dataProduk.id,
                idToko: dataProduk.idToko,
                nama: dataProduk.nama,
                harga: dataProduk.harga,
                satuan: dataProduk.satuan,
                stok: dataProduk.stok,
                foto: foto
            })
        }).then(() => { Router.push('/produk') })
    }

    return (
        <>
            <Head>
                <title>Edit Produk</title>
            </Head>
            <div className="mx-5 mt-5 ">
                <button onClick={() => { Router.push('/produk') }} className="button green is-size-7-mobile"><i className="fas fa-arrow-left pr-2 green"></i>Kembali</button>
            </div>
            <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center masukan">
                <p>Edit Produk</p>
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
                    <label htmlFor="inputNama" className="label">Nama</label>
                    <div className="control">
                        <input name="nama" onChange={handleChange.bind(this)} value={dataProduk.nama} type="text" className="input" required />
                    </div>
                </div>
                <div className="masukan mb-2 px-5">
                    <label htmlFor="harga" className="label">Harga</label>
                    <div className="control">
                        <input name="harga" onChange={handleChange.bind(this)} value={dataProduk.harga} type="number" className="input" required />
                    </div>
                </div>
                <div className="masukan mb-2 px-5">
                    <label htmlFor="stok" className="label">Stok</label>
                    <div className="control">
                        <input name="stok" onChange={handleChange.bind(this)} value={dataProduk.stok} type="number" className="input" required />
                    </div>
                </div>
                <div className="masukan mb-2 px-5">
                    <label htmlFor="inputNama" className="label">Satuan</label>
                    <div className="select">
                        <select className="s" onChange={handleChange.bind(this)} value={dataProduk.satuan} name="satuan">
                            <option value="Kg">Kg</option>
                            <option value="Ons">Ons</option>
                            <option value="Ikat">Ikat</option>
                            <option value="Liter">Liter</option>
                            <option value="Buah">Buah</option>
                        </select>
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