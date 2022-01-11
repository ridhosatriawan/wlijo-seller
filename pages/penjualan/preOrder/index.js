import Head from 'next/head';
import Link from 'next/link';
import { useState } from "react";

export async function getServerSideProps(ctx) {
    const req = await fetch('http://localhost:3080/penjualanLangsung', {
        headers: {
            "Content-Type": "application/json"
        }
    })

    const res = await req.json();

    return {
        props: {
            list: res
        }
    }
}

const PreOrder = (props) => {
    const [list, setList] = useState(props.list);
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
                <div className="block my-5 tp-border">
                    {
                        list.map((data, index) => (
                            <div key={index} className="is-flex is-align-items-center is-justify-content-space-between px-5 mt-3 pb-3 btm-border">
                                <h3 className="is-size-5-mobile is-size-3-desktop">{data.judul}</h3>
                                <div className="aksi">
                                    <Link href={"/penjualan/preOrder/" + data.id}>
                                        <button className="button is-size-6-desktop is-size-7-mobile bg-green white">
                                            Detail
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </>
    );
}

export default PreOrder;