import { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';

export async function getServerSideProps(ctx) {
    const { id, idToko } = ctx.query;
    const req = await fetch(`http://localhost:3000/api/rencanaBelanja/detail/${idToko}/${id}`);
    const res = await req.json();


    return {
        props: {
            data: res.result
        }
    }
}

export default function Detail(props) {
    const [list, seList] = useState(props.data.list)
    return (
        <>
            <Head>
                <title>Detail Rencana Belanja</title>
            </Head>
            <div className={"mx-5 mt-5 "}>
                <button className="button green is-size-7-mobile" onClick={() => { Router.push('/rencanaBelanja') }}><i className="fas fa-arrow-left pr-2 green"></i>Kembali</button>
            </div>
            <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center masukan">
                <p>{props.data.judul}</p>
            </div>
            <div className="hscroll">
                <table className="table">
                    <thead>
                        <tr>
                            <td className="white">No</td>
                            <td className="white">Nama Produk</td>
                            <td className="white">Rencana Pembelian</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.jumlah + " " + item.satuan}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}