import Head from 'next/head';
import Router from 'next/router';
import { useState, useRef } from 'react';
import Resizer from 'react-image-file-resizer';
import ModalCrop from '../../components/modalCrop';

export async function getServerSideProps(ctx) {

    const req = await fetch('http://localhost:3080/profil');
    const res = await req.json();

    return {
        props: {
            data: res
        }
    }

}

const TambahTransaksi = (props) => {

    const idToko = props.data[0].id;

    const [croppedFoto, setCroppedFoto] = useState(null);
    const [modal, setModal] = useState("modal");
    const [foto, setFoto] = useState(null);
    const [data, setData] = useState({
        nama: '',
        satuan: "kg",
        harga: "",
        jumlah: ''
    })

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

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]: value
        })

    }

    async function handleChangeImg(e) {
        const file = e.target.files[0];
        const resize = await resizeFile(file);

        setFoto(
            resize
        )
        setModal('modal is-active')
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

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/api/produk/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idToko,
                nama: data.nama,
                harga: data.harga,
                satuan: data.satuan,
                stok: data.jumlah,
                foto: foto
            })
        }).then(() => { Router.push('/produk') })
    }

    return (
        <div>
            <Head>
                <title>Tambah Produk</title>
            </Head>
            <div className="mx-5 mt-5 ">
                <button onClick={() => { Router.push('/produk') }} className="button green is-size-7-mobile"><i className="fas fa-arrow-left pr-2 green"></i>Kembali</button>
            </div>
            <div className="mx-5 mt-5 green title is-size-4-mobile">
                Tambah Produk
            </div>
            <ModalCrop foto={foto} modal={modal} saveCropped={saveCropped} handleChangeImg={handleChangeImg} cropperRef={cropperRef} onCrop={onCrop} />
            <form onSubmit={handleSubmit.bind(this)} autoComplete="off" className="is-flex is-flex-direction-column form  my-6 ">
                <div className="masukan mb-2 px-5">
                    <label htmlFor="nama" className="label">Nama Produk</label>
                    <div className="control">
                        <input name="nama" onChange={handleChange.bind(this)} value={data.nama} type="text" className="input " />
                    </div>
                </div>
                <div className="masukan mb-2 px-5">
                    <label htmlFor="jumlah" className="label">Stok</label>
                    <div className="control">
                        <input name="jumlah" onChange={handleChange.bind(this)} value={data.jumlah} type="number" className="input " />
                    </div>
                </div>
                <div className="masukan mb-2 px-5">
                    <label htmlFor="harga" className="label">Harga</label>
                    <div className="control">
                        <input name="harga" onChange={handleChange.bind(this)} value={data.harga} type="number" className="input " />
                    </div>
                </div>
                <div className="masukan mb-2 px-5">
                    <label htmlFor="inputNama" className="label">Satuan</label>
                    <div className="select">
                        <select className="s" onChange={handleChange.bind(this)} value={data.satuan} name="satuan">
                            <option value="Kg">Kg</option>
                            <option value="Ons">Ons</option>
                            <option value="Ikat">Ikat</option>
                            <option value="Liter">Liter</option>
                            <option value="Buah">Buah</option>
                        </select>
                    </div>
                </div>
                <div className='masukan mb-2 px-5'>
                    <label htmlFor="inputNama" className="label">Foto</label>
                    {
                        foto ? <figure className="image is-128x128">
                            <img src={foto} />
                        </figure> : null
                    }
                    <div className="file mt-2">
                        <label className="file-label">
                            <input className="file-input" type="file" name="resume" onChange={handleChangeImg.bind(this)} />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    Pilih Foto
                                </span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className="masukan my-2 px-5">
                    <div className="control">
                        <button className="button bg-green white is-rounded" type="submit">Tambah</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TambahTransaksi;