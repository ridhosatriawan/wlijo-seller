import Head from 'next/head';
import Router from 'next/router';
import { useState } from 'react';

const TambahTransaksi = () => {
    const [list, setList] = useState([])
    const [uangMasuk, setUangMasuk] = useState("");
    const [update, setUpdate] = useState({
        active: "off",
        idUp: ""
    });

    const [data, setData] = useState({
        id: "",
        nama: '',
        satuan: "kg",
        harga: "",
        jumlah: ''
    })



    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({
            ...data,
            [name]: value
        })
    }

    const handleDelete = (id) => {
        const filtered = list.filter(data => data.id !== id);
        setList(
            filtered
        )
    }

    const handleUang = (e) => {
        const value = e.target.value;

        setUangMasuk(value);
    }

    const handleUpdate = (id) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = list.length + 1;

        if (update.active === "off") {
            setList([...list,
            {
                id: id,
                nama: data.nama,
                jumlah: data.jumlah,
                satuan: data.satuan,
                harga: data.harga
            }
            ]);

        } else {
            for (var i in list) {
                if (list[i].id === update.idUp) {
                    list[i].nama = data.nama;
                    list[i].jumlah = data.jumlah;
                    list[i].satuan = data.satuan;
                    list[i].harga = data.harga;
                    break;
                }
            }
            setUpdate({
                active: "off",
                idUp: ""
            })
        }


        setData({
            id: '',
            nama: '',
            satuan: "kg",
            jumlah: '',
            harga: ""
        })
    }

    const price = list.map(({ harga, jumlah }) => harga * jumlah);
    const total = (price.length != 0) ? price.reduce((total, amount) => total + amount) : "";

    return (
        <div>
            <Head>
                <title>Tambah Transaksi</title>
            </Head>
            <div className="mx-5 mt-5 ">
                <button onClick={() => { Router.push('/penjualan/langsung') }} className="button green is-size-7-mobile"><i className="fas fa-arrow-left pr-2 green"></i>Kembali</button>
            </div>
            <div className="mx-5 mt-5 green title is-size-4-mobile">
                Tambah Transaksi
            </div>
            <div className="wrapper-kasir ml-5 mt-5">
                <div className="green is-size-7-mobile">
                    Judul : <span className="gray"> {title} </span>
                </div>
            </div>
            <form onSubmit={handleSubmit.bind(this)} autoComplete="off" className="is-flex is-flex-direction-column form  my-6 ">
                <div className="masukan mb-2 px-5">
                    <label htmlFor="nama" className="label">Nama Produk</label>
                    <div className="control">
                        <input name="nama" onChange={handleChange.bind(this)} value={data.nama} type="text" className="input " />
                    </div>
                </div>
                <div className="masukan mb-2 px-5">
                    <label htmlFor="jumlah" className="label">Jumlah</label>
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
                    <label htmlFor="inputNama" className="label">Satuan Pembelian</label>
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
                <div className="masukan my-2 px-5">
                    <div className="control">
                        <button className="button bg-green white is-rounded" type="submit">Tambah</button>
                    </div>
                </div>
            </form>
            <div className="masukan mb-2 px-5">
                <label htmlFor="uangMasuk" className="label">Uang Masuk</label>
                <div className="control">
                    <input name="uangMasuk" onChange={handleUang.bind(this)} value={uangMasuk} type="number" className="input " />
                </div>
            </div>
            <div className="hscroll">
                <table className="table">
                    <thead>
                        <tr>
                            <td className='white'>No</td>
                            <td className='white'>Nama</td>
                            <td className='white'>Jumlah</td>
                            <td className='white'>Harga</td>
                            <td className='white'>Total</td>
                            <td className='white'>Aksi</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((data, index) => (

                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.nama}</td>
                                    <td>{data.jumlah} {data.satuan}</td>
                                    <td>Rp.{data.harga}</td>
                                    <td>Rp. {parseInt(data.harga) * parseInt(data.jumlah)}</td>
                                    <td>
                                        <button className="button is-rounded bg-green white is-small" onClick={handleUpdate.bind(this, data.id)}>Ubah</button>
                                        <button className="button is-rounded bg-red white is-small" onClick={handleDelete.bind(this, data.id)}>hapus</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="is-flex mx-4 green">
                <label htmlFor="harga total">Uang Diterima : {uangMasuk}</label>
                <div className="harga-total"></div>
            </div>
            <div className="is-flex mx-4">
                <label htmlFor="harga total">Total Bayar : {total}</label>
                <div className="harga-total"></div>
            </div>
            <div className="is-flex mx-4 red">
                <label htmlFor="harga total">Kembalian : {uangMasuk - total}</label>
                <div className="harga-total"></div>
            </div>
            <button className="button bg-green white is-rounded my-5 mx-4" type="submit">Bayar</button>
        </div>
    );
}

export default TambahTransaksi;