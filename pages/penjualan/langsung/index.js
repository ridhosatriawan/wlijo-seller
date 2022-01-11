import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";
import cookies from "next-cookies";

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

  const req = await fetch('http://localhost:3000/api/penjualanLangsung/' + idToko, {
    headers: {
      "Content-Type": "application/json"
    }
  })

  const res = await req.json();

  return {
    props: {
      list: res.data,
      idToko
    }
  }
}

const PenjualanLangsung = (props) => {
  const { idToko } = props
  const [list, setList] = useState(props.list);
  const [title, setTitle] = useState("");
  const [modal, setModal] = useState('modal');

  const titleChange = (e) => {
    const value = e.target.value;
    const len = title.length;
    if (len < 20) {
      setTitle(value);
    }
  }

  const modalHandler = () => {
    if (modal === "modal") {
      setModal("modal is-active")
    } else {
      setModal("modal")
    }
  }

  function handleDelete(id) {
    const validation = confirm("Mau di Hapus ?");
    const filtered = list.filter(data => data.idPl !== id);

    if (validation) {
      fetch(`http://localhost:3000/api/penjualanLangsung/delete/${idToko}/${id}`, {
        method: "DELETE"
      });
      setList(
        filtered
      );
    }

  }

  const sendPl = () => {
    fetch('http://localhost:3000/api/penjualanLangsung/create', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        judul: title,
        idToko
      })
    }).then(() => { Router.push("/penjualan/langsung/tambahTransaksi") })


  }

  return (
    <>
      <Head>
        <title>Penjualan Langsung</title>
      </Head>
      <div className="title is-size-5-mobile green pl-5 pt-5">
        <p>Penjualan</p>
      </div>
      <div className="columns is-mobile my-5">
        <div className="column has-text-centered divi">
          <Link href="/penjualan/langsung">
            <a className="is-size-3-desktop active">Langsung</a>
          </Link>
        </div>
        <div className="column has-text-centered">
          <Link href="/penjualan/preOrder">
            <a className="is-size-3-desktop gray">Pre Order</a>
          </Link>
        </div>
      </div>
      <div className="is-flex is-justify-content-left pb-5">
        <button className="button is-flex is-align-items-center green mx-5 content" onClick={modalHandler}>
          <i className="fas fa-plus mr-3"></i>Tambah Penjualan Langsung</button>
      </div>
      {/* modal */}
      <div className='px-5'>
        <div className={modal}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Masukan Judul</p>
            </header>
            <section className="modal-card-body">
              <input onChange={titleChange} value={title} placeholder="Masukan Judul" className='input' />
              <span className='is-size-7'>max 20 karakter</span>
            </section>
            <footer className="modal-card-foot is-justify-content-end">
              <button className="button bg-green white" onClick={sendPl}>Lanjut</button>
              <button className="button" onClick={modalHandler.bind(this)}>Batal</button>
            </footer>
          </div>
        </div>
      </div>
      {/* modal */}
      <div className="block my-5 tp-border">
        {
          list.map((data, index) => (
            <div key={index} className="is-flex is-align-items-center is-justify-content-space-between px-5 mt-3 pb-3 btm-border">
              <h3 className="is-size-5-mobile is-size-3-desktop">{data.judul}</h3>
              <div className="aksi">
                <Link href={"/penjualan/langsung/detail/" + idToko + "/" + data.idPl}>
                  <button className="button is-size-6-desktop is-size-7-mobile bg-green white">
                    Detail
                  </button>
                </Link>
                <button onClick={handleDelete.bind(this, data.idPl)} className="button is-size-6-desktop is-size-7-mobile bg-red white ml-1">
                  hapus
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default PenjualanLangsung;
