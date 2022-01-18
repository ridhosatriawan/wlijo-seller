import Head from 'next/head';
import Link from 'next/link';
import { useState } from "react";
import cookies from 'next-cookies';

export async function getServerSideProps(ctx) {
    const { idToko, token } = cookies(ctx);
    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const req = await fetch(`http://localhost:3000/api/penjualanPreOrder/${idToko}`, {
        headers: {
            "Content-Type": "application/json"
        },
    });

    const res = await req.json();

    const pesanan = res.data.filter(data => {
        if (data.status === "pesanan") return data;
    })
    const diantar = res.data.filter(data => {
        if (data.status === "diantar") return data;
    })
    const selesai = res.data.filter(data => {
        if (data.status === "selesai") return data;
    })
    const batal = res.data.filter(data => {
        if (data.status === "batal") return data;
    })

    return {
        props: {
            pesanan,
            diantar,
            selesai,
            batal
        }
    }
}

const PreOrder = (props) => {
    const [one, setOne] = useState(props.pesanan);
    const [two, setTwo] = useState(props.diantar);
    const [three, setThree] = useState(props.selesai);
    const [four, setFour] = useState(props.batal);

    const [tab, setTabs] = useState({ first: "is-active", second: "", third: "", fourth: "" });
    const [visible, setVisible] = useState({ first: "mt-5", second: "is-hidden", third: "is-hidden", fourth: "is-hidden" });

    function handleTab(nama, e) {
        e.preventDefault();
        setTabs({
            first: "", second: "", third: "", fourth: ""
        });

        setTabs({
            tab,
            [nama]: "is-active"
        });
        setVisible({
            first: "is-hidden",
            second: "is-hidden",
            third: "is-hidden",
            fourth: "is-hidden",
            [nama]: "mt-5"
        })
    }
    return (
        <>
            <Head>
                <title>Penjualan PreOrder</title>
            </Head>
            <div className="title is-size-5-mobile green pl-5 pt-5">
                <p>Penjualan</p>
            </div>
            <div className="columns is-mobile my-5">
                <div className="column has-text-centered divi">
                    <Link href="/penjualan/langsung">
                        <a className="is-size-3-desktop gray">Langsung</a>
                    </Link>
                </div>
                <div className="column has-text-centered">
                    <Link href="/penjualan/preOrder">
                        <a className="is-size-3-desktop active">Pre Order</a>
                    </Link>
                </div>
            </div>
            <div className='mx-2'>
                <div className="tabs is-centered is-boxed is-small">
                    <ul>
                        <li className={tab.first}>
                            <a onClick={handleTab.bind(this, "first")}>
                                <span className="icon is-small"><i className="fas fa-shopping-bag" aria-hidden="true"></i></span>
                                <span>Pesanan</span>
                            </a>
                        </li>
                        <li className={tab.second}>
                            <a onClick={handleTab.bind(this, "second")}>
                                <span className="icon is-small"><i className="fas fa-motorcycle" aria-hidden="true"></i></span>
                                <span>Diantar</span>
                            </a>
                        </li>
                        <li className={tab.third} >
                            <a onClick={handleTab.bind(this, "third")}>
                                <span className="icon is-small"><i className="fas fa-box-open" aria-hidden="true"></i></span>
                                <span>Selesai</span>
                            </a>
                        </li>
                        <li className={tab.fourth} >
                            <a onClick={handleTab.bind(this, "fourth")}>
                                <span className="icon is-small"><i className="fas fa-window-close"></i></span>
                                <span>Batal</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="block mx-2 my-5 tp-border">
                <div className={visible.first}>
                    {
                        one.map((data, index) => (
                            <div key={index} className={`card mb-3`}>
                                <div className="card-content">
                                    <div className="content is-flex is-justify-content-space-between is-align-items-center">
                                        <div className='is-size-6 has-text-weight-bold'>{data.judul}</div>
                                        <Link href={`/penjualan/preOrder/pesanan/${data.idPo}`}>
                                            <button className='button bg-green white is-small'>Detail</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={visible.second}>
                    {
                        two.map((data, index) => (
                            <div key={index} className={`card mb-3`}>
                                <div className="card-content">
                                    <div className="content is-flex is-justify-content-space-between is-align-items-center">
                                        <div className='is-size-6 has-text-weight-bold'>{data.judul}</div>
                                        <Link href={`/penjualan/preOrder/diantar/${data.idToko}`}>
                                            <button className='button bg-green white is-small'>Detail</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={visible.third}>
                    {
                        three.map((data, index) => (
                            <div key={index} className={`card mb-3 `}>
                                <div className="card-content">
                                    <div className="content is-flex is-justify-content-space-between is-align-items-center">
                                        <div className='is-size-6 has-text-weight-bold'>{data.judul}</div>
                                        <Link href={`/penjualan/preOrder/selesai/${data.idToko}`}>
                                            <button className='button bg-green white is-small'>Detail</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={visible.fourth}>
                    {
                        four.map((data, index) => (
                            <div key={index} className={`card mb-3`}>
                                <div className="card-content">
                                    <div className="content is-flex is-justify-content-space-between is-align-items-center">
                                        <div className='is-size-6 has-text-weight-bold'>{data.judul}</div>
                                        <Link href={`/penjualan/preOrder/batal/${data.idToko}`}>
                                            <button className='button bg-green white is-small'>Detail</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default PreOrder;