import Head from "next/head";
import { useState } from "react";
import CardProduct from "../../components/cardProduct";
import Link from 'next/link';
import cookies from "next-cookies";
import Modal from "../../components/Modal";

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

    const req = await fetch('http://localhost:3000/api/produk/' + idToko);
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
    const [modal, setModal] = useState("modal");
    const [id, setId] = useState("");
    function modalHandler(id) {
        setId(id);
        if (modal === "modal") {
            setModal("modal is-active");
        } else {
            setModal("modal");
        }
    }

    function lanjutHandler() {
        modalHandler();
        handleDelete(id);
        setId("")
    }


    const handleDelete = (id) => {
        const filtered = cards.filter(card => card.id !== id);

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



    return (
        <>
            <Head>
                <title>
                    Produk
                </title>
            </Head>
            <Modal modal={modal} text="Hapus Produk ?" lanjutHandler={lanjutHandler} cancelHandler={modalHandler} />
            <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center" style={{ maxWidth: 500 + "px" }}>
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
                        <CardProduct key={i} data={data} handleDelete={modalHandler.bind(this, data.id)} />
                    ))
                }
            </div>
        </>
    )
}