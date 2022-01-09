import Head from "next/head";
import { useState } from "react";
import CardProduct from "../../components/cardProduct";
import Link from 'next/link';

export async function getServerSideProps(ctx) {
    const req = await fetch('http://localhost:3000/api/produk');
    const res = await req.json();


    return {
        props: {
            data: res.data
        }
    }
}

export default function Produk(props) {
    const [cards, setCards] = useState(props.data);
    const [filteredCards, setFilteredCards] = useState(cards);
    const handleChange = event => {
        const value = event.target.value;
        const list = cards.filter(card => {
            return card.nama.toLowerCase().includes(value.toLowerCase());
        })

        setFilteredCards(
            list
        )

    };

    const handleDelete = (id) => {
        const filtered = cards.filter(card => card.id !== id);
        const validation = confirm("Mau Hapus ?");

        if (validation) {
            fetch('http://localhost:3000/api/produk/delete/' + id, {
                method: "DELETE"
            });

            setCards(
                filtered
            )
            setFilteredCards(
                filtered
            )

        }

    }



    return (
        <>
            <Head>
                <title>
                    Produk
                </title>
            </Head>
            <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center">
                <p>Produk</p>
                <Link href="/produk/tambahProduk">
                    <button className="button is-small white bg-green">Tambah Produk</button>
                </Link>
            </div>

            {/* input */}
            <div className="masukan mb-2 px-5">
                <div className="control has-icons-left ">
                    <input onChange={handleChange} type="text" className="input " placeholder="Cari Barang" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
            {/* input */}
            <div className="px-5 ">
                {
                    filteredCards.map((data, i) => (
                        <CardProduct key={i} data={data} handleDelete={handleDelete.bind(this, data.id)} />
                    ))
                }
            </div>
        </>
    )
}