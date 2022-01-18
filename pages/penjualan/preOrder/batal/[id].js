import Head from 'next/head';
import Router from 'next/router';
import cookies from "next-cookies";
import { useState } from 'react';

export async function getServerSideProps(ctx) {
    const { idToko } = cookies(ctx);
    const { id } = ctx.query;

    const req = await fetch(`http://localhost:3000/api/penjualanPreOrder/selesai/${idToko}/${id}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    const res = await req.json();

    return {
        props: {
            dataPo: res.dataPo,
            detailPesanan: res.dataPesanan
        }
    }

}

export default function batalPesanan(props) {
    const [pesanan, setPesanan] = useState(props.detailPesanan);
    const [dataPo, setdataPo] = useState(props.dataPo);

    const price = pesanan.map(({ harga }) => harga);
    const total = (price.length != 0) ? price.reduce((total, amount) => total + amount) : "";

    return (
        <>
            <Head>
                <title>Penjualan PreOrder</title>
            </Head>
            <div className='px-5 mt-5'>
                <button className="button green is-size-7-mobile" onClick={() => { Router.push('/penjualan/preOrder') }}>
                    <i className="fas fa-arrow-left pr-2 green"></i>
                    Kembali
                </button>

                <div className="title is-size-5-mobile green pt-5">
                    <p>Detail Pesanan Dibatalkan</p>
                </div>

                <div className='mb-5'>
                    <p className='is-size-6 has-text-weight-bold'>Nama : {dataPo.judul}</p>
                    <p className='is-size-6 '><span className='has-text-weight-bold'>Alamat :</span> {dataPo.alamat}</p>
                </div>

                <table className='table'>
                    <thead>
                        <tr>
                            <td className='white'>No</td>
                            <td className='white'>Nama</td>
                            <td className='white'>Jumlah</td>
                            <td className='white'>Harga</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pesanan.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.nama}</td>
                                    <td>{data.jumlah} {data.satuan}</td>
                                    <td>{data.harga}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
                <div>
                    total : {total}
                </div>
            </div>
        </>
    )
}