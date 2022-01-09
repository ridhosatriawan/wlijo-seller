import Head from 'next/head';
import Router from 'next/router';
import { useState } from 'react';
import cookies from 'next-cookies';

export async function getServerSideProps(ctx) {
    const { idToko } = cookies(ctx)
    const req = await fetch('http://localhost:3000/api/rencanaBelanja/' + idToko);
    const res = await req.json();

    const lastItem = res.data[res.data.length - 1]
    const idRencana = lastItem.idRencana;
    const judul = lastItem.judul;

    return {
        props: {
            idToko,
            idRencana,
            judul
        }
    }
}

const TambahRencanaBelanja = (props) => {
    const { idToko, idRencana, judul } = props;
    const [data, setData] = useState({
        id: "",
        nama: '',
        satuan: "kg",
        jumlah: ''
    })

    const [list, setList] = useState([]);
    const [update, setUpdate] = useState({
        active: "off",
        idUp: ""
    });





    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]: value
        })
    }

    const handleUpdate = (id) => {
        console.log(id);
        const filtered = list.filter(data => data.id === id);
        const { nama, jumlah, satuan, harga } = filtered[0];
        setUpdate({
            active: "on",
            idUp: id
        })

        setData({
            id: id,
            nama: nama,
            jumlah: jumlah,
            satuan: satuan,
            harga: harga
        })

    }

    const handleDelete = (id) => {
        const filtered = list.filter(data => data.id !== id);
        setList(
            filtered
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = list.length + 1;

        if (update.active === 'off') {
            setList([...list,
            {
                id: id,
                nama: data.nama,
                jumlah: data.jumlah,
                satuan: data.satuan
            }
            ]);
        } else {
            for (var i in list) {
                if (list[i].id === update.idUp) {
                    list[i].nama = data.nama;
                    list[i].jumlah = data.jumlah;
                    list[i].satuan = data.satuan;
                    break;
                }
            };
            setUpdate({
                active: "off",
                idUp: ""
            });
        }



        setData({
            id: "",
            nama: '',
            satuan: "kg",
            jumlah: ''
        })
    }

    const sendData = () => {
        fetch('http://localhost:3000/api/rencanaBelanja/tambah/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idToko: idToko,
                idRencana: idRencana,
                list: list
            })
        }).then(() => { Router.push('/rencanaBelanja') })
    }

    return (
        <div>
            <Head>
                <title>Tambah Rencana Belanja</title>
            </Head>
            <div className="mx-5 mt-5 ">
                <button onClick={() => { Router.push('/rencanaBelanja') }} className="button green is-size-7-mobile"><i className="fas fa-arrow-left pr-2 green"></i>Kembali</button>
            </div>
            <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center masukan">
                <p>Tambah Rencana Belanja</p>
            </div>
            <div className="is-size-5-mobile gray px-5 is-flex is-justify-content-space-between is-align-items-center masukan">
                <p>Judul : {judul}</p>
            </div>
            <form onSubmit={handleSubmit.bind(this)} autoComplete="off" className="is-flex is-flex-direction-column form  my-6">
                <div className="masukan mb-2 px-5">
                    <label htmlFor="inputNama" className="label">Nama Barang</label>
                    <div className="control">
                        <input name="nama" onChange={handleChange.bind(this,)} value={data.nama} type="text" className="input" required />
                    </div>
                </div>
                <div className="masukan mb-2 px-5">
                    <label htmlFor="inputNama" className="label">Jumlah</label>
                    <div className="control">
                        <input name="jumlah" onChange={handleChange.bind(this)} value={data.jumlah} type="number" className="input" required />
                    </div>
                </div>
                <div className="masukan mb-2 px-5">
                    <label htmlFor="inputNama" className="label">Satuan Rencana Pembelian</label>
                    <div className="select">
                        <select className="s" onChange={handleChange.bind(this)} value={data.satuan} name="satuan">
                            <option>Kg</option>
                            <option>Ons</option>
                            <option>Ikat</option>
                            <option>Liter</option>
                            <option>Buah</option>
                        </select>
                    </div>
                </div>
                <div className="masukan my-2 px-5">
                    <div className="control">
                        <button className="button bg-green white is-rounded" type="submit">Tambah</button>
                    </div>
                </div>
            </form>
            <div className="hscroll">
                <table className="table">
                    <thead>
                        <tr>
                            <td className="white">No</td>
                            <td className="white">Nama Produk</td>
                            <td className="white">Rencana Pembelian</td>
                            <td className="white">Aksi</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((data, index) => (

                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.nama}</td>
                                    <td>{data.jumlah} {data.satuan}</td>
                                    <td>
                                        <button className="button is-rounded bg-green white is-small" onClick={handleUpdate.bind(this, data.id)}>Ubah</button>
                                        <button className="button is-rounded bg-red white is-small" onClick={handleDelete.bind(this, data.id)}>hapus</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <button className="button bg-green white is-rounded my-5 mx-4" onClick={sendData} type="button">Simpan</button>
        </div>
    );
}

export default TambahRencanaBelanja;