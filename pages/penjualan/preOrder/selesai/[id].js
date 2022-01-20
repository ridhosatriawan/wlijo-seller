import React, { useState, useRef } from "react";
import Head from "next/head";
import Router from "next/router";
import { useReactToPrint } from "react-to-print";
import cookies from "next-cookies";

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

class ComponentToPrint extends React.Component {
    render() {
        const price = this.props.data.map(({ harga }) => harga);
        const total = (price.length != 0) ? price.reduce((total, amount) => total + amount) : "";
        return (
            <div >
                <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center masukan">
                    <p>{this.props.judul}</p>
                </div>

                <div className='mx-5 mb-5'>
                    <p className='is-size-6 has-text-weight-bold'>Nama : {this.props.dataPo.judul}</p>
                    <p className='is-size-6 '><span className='has-text-weight-bold'>Alamat :</span> {this.props.dataPo.alamat}</p>
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
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.jumlah + " " + item.satuan}</td>
                                    <td>{item.harga}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="ml-5">
                    Total : {total}
                </div>
            </div>
        )
    }
}

export default function DetailPO(props) {
    const [pesanan, setPesanan] = useState(props.detailPesanan);
    const [dataPo, setdataPo] = useState(props.dataPo);

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
                <button className="button green is-size-7-mobile" onClick={() => { Router.push('/penjualan/preOrder') }}><i className="fas fa-arrow-left pr-2 green"></i>Kembali</button>
            </div>
            <ComponentToPrint ref={componentRef} data={pesanan} dataPo={dataPo} />
            <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center masukan">
                <button onClick={handlePrint} className="button is-small bg-green white">
                    Cetak
                </button>
            </div>
        </>
    )
}