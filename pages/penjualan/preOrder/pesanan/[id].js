import Head from 'next/head';
import Modal from '../../../../components/Modal';
import { useState } from 'react';
import Router from 'next/router';
import cookies from 'next-cookies';

export async function getServerSideProps(ctx) {
    const { idToko } = cookies(ctx);
    const { id } = ctx.query;

    const req = await fetch(`http://localhost:3000/api/penjualanPreOrder/pesanan/${idToko}/${id}`, {
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

export default function detailPesanan(props) {
    const [pesanan, setPesanan] = useState(props.detailPesanan);
    const [dataPo, setdataPo] = useState(props.dataPo);
    const [modalDelete, setModalDelete] = useState('modal');
    const [modalAntar, setModalAntar] = useState('modal');

    const modalDeleteHandler = () => {
        if (modalDelete === "modal") {
            setModalDelete("modal is-active")
        } else {
            setModalDelete("modal")
        }
    }
    const modalAntarHandler = () => {
        if (modalAntar === "modal") {
            setModalAntar("modal is-active")
        } else {
            setModalAntar("modal");
        }
    }

    function handleAntar() {
        modalAntarHandler();
        fetch(`http://localhost:3000/api/penjualanPreOrder/pesanan/update/${dataPo.idPo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idToko: dataPo.idToko,
                judul: dataPo.judul,
                status: "diantar",
                alamat: dataPo.alamat
            })
        }).then(Router.replace('/penjualan/preOrder'));
    }

    function handleBatal() {
        modalAntarHandler();
        fetch(`http://localhost:3000/api/penjualanPreOrder/pesanan/update/${dataPo.idPo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idToko: dataPo.idToko,
                judul: dataPo.judul,
                status: "batal",
                alamat: dataPo.alamat
            })
        }).then(Router.replace('/penjualan/preOrder'));


    }

    const price = pesanan.map(({ harga }) => harga);
    const total = (price.length != 0) ? price.reduce((total, amount) => total + amount) : "";

    return (
        <>
            <Head>
                <title>Penjualan PreOrder</title>
            </Head>
            <Modal modal={modalAntar} text="Antar Pesanan ?" lanjutHandler={handleAntar} cancelHandler={modalAntarHandler} />
            <Modal modal={modalDelete} text="Batalkan Pesanan ?" lanjutHandler={handleBatal} cancelHandler={modalDeleteHandler} />
            <div className='px-5 mt-5'>
                <button className="button green is-size-7-mobile" onClick={() => { Router.push('/penjualan/preOrder') }}>
                    <i className="fas fa-arrow-left pr-2 green"></i>
                    Kembali
                </button>

                <div className="title is-size-5-mobile green pt-5">
                    <p>Detail Pesanan</p>
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
                <div className='is-flex is-align-items-center is-justify-content-start mt-5'>
                    <button onClick={modalAntarHandler} className='button is-small bg-green white mr-1'>Antar</button>
                    <button onClick={modalDeleteHandler} className='button is-small bg-red white'>Batalkan</button>
                </div>
            </div>
        </>
    )
}