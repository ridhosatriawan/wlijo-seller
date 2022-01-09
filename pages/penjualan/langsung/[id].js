import React, { useState } from "react";
import Head from "next/head";
import Router from "next/router";

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;

    const detail = await fetch('http://localhost:3080/detailPenjualanLangsung?idPL=' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const titles = await fetch('http://localhost:3080/penjualanLangsung/' + id, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const res = await detail.json();
    const title = await titles.json();


    return {
        props: {
            data: res,
            title
        }
    }
}


export default function detailPL(props) {
    const [list, seList] = useState(props.data);
    const price = list.map(({ harga }) => harga);
    const total = price.reduce((total, amount) => total + amount);

    return (
        <>
            <Head>
                <title>Penjualan Langsung</title>
            </Head>
            <div className={"mx-5 mt-5 "}>
                <button className="button green is-size-7-mobile" onClick={() => { Router.push('/penjualan/langsung') }}><i className="fas fa-arrow-left pr-2 green"></i>Kembali</button>
            </div>
            <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center masukan">
                <p>{props.title.judul}</p>
            </div>
            <div className="hscroll">
                <table className="table">
                    <thead>
                        <tr>
                            <td className="white">No</td>
                            <td className="white">Nama</td>
                            <td className="white">Jumlah</td>
                            <td className="white">Harga</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item, index) =>
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.jumlah + " " + item.satuan}</td>
                                    <td>{item.harga}</td>
                                </tr>
                            )
                        }
                        <tr className="has-font-weight-bold">
                            <td>Total : </td>
                            <td>{total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}