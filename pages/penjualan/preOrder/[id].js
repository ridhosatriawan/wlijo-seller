import React, { useState, useRef } from "react";
import Head from "next/head";
import Router from "next/router";
import { useReactToPrint } from "react-to-print";

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

class ComponentToPrint extends React.Component {
    render() {
        const price = this.props.data.map(({ harga }) => harga);
        const total = price.reduce((total, amount) => total + amount);
        return (
            <div >
                <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center masukan">
                    <p>{this.props.judul}</p>
                </div>
                <table className="table ml-5">
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
                            this.props.data.map((item, index) =>
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
        )
    }
}

export default function detailPO(props) {
    const [list, seList] = useState(props.data);
    const price = list.map(({ harga }) => harga);
    const total = price.reduce((total, amount) => total + amount);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <>
            <Head>
                <title>Pre Order</title>
            </Head>
            <div className={"mx-5 mt-5 "}>
                <button className="button green is-size-7-mobile" onClick={() => { Router.push('/penjualan/langsung') }}><i className="fas fa-arrow-left pr-2 green"></i>Kembali</button>
            </div>
            <ComponentToPrint ref={componentRef} data={list} judul={props.title.judul} />
            <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center masukan">
                <button onClick={handlePrint} className="button is-small bg-green white">
                    Cetak
                </button>
            </div>
        </>
    )
}