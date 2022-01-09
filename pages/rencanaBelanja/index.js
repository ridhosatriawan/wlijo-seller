import Head from "next/head";
import Link from "next/link";
import { useState } from 'react';
import cookies from "next-cookies";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  const { idToko } = cookies(ctx);

  const req = await fetch('http://localhost:3000/api/rencanaBelanja/' + idToko, {
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

const RencanaBelanja = (props) => {
  const { idToko } = props
  const [list, setList] = useState(props.list);
  const [modal, setModal] = useState('modal');
  const [title, setTitle] = useState("");

  const modalHandler = () => {
    if (modal === "modal") {
      setModal("modal is-active")
    } else {
      setModal("modal")
    }
  }

  const titleChange = (e) => {
    const value = e.target.value;
    const len = title.length;
    if (len < 20) {
      setTitle(value);
    }
  }

  function handleDelete(id) {
    // belum bisa hapus detailnya
    const validation = confirm("Mau di Hapus ?");
    const filtered = list.filter(data => data.idRencana !== id);
    console.log(validation);

    if (validation) {
      fetch(`http://localhost:3000/api/rencanaBelanja/delete/${idToko}/${id}`, {
        method: "DELETE"
      });
      setList(
        filtered
      );
      console.log("asek");
    }

  }

  const sendRencana = () => {
    fetch('http://localhost:3000/api/rencanaBelanja/create', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        judul: title,
        idToko
      })
    }).then(() => { Router.push("/rencanaBelanja/tambahRencanaBelanja") })


  }

  return (
    <div>
      <Head>
        <title>Rencana Belanja</title>
      </Head>
      <div className="title is-size-5-mobile green px-5 pt-5 is-flex is-justify-content-space-between is-align-items-center masukan">
        <p>Rencana Belanja</p>
      </div>
      <div className="has-text-centered is-flex-direction-column">
        <div className="is-flex is-justify-content-left pb-5">
          <button className="button is-flex is-align-items-center green mx-5 content" onClick={modalHandler}>
            <i className="fas fa-plus mr-3"></i>Tambah Rencana Belanja</button>
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
                <button className="button bg-green white" onClick={sendRencana}>Lanjut</button>
                <button className="button" onClick={modalHandler.bind(this)}>Batal</button>
              </footer>
            </div>
          </div>
        </div>
        {/* modal */}
        <div className="block my-5 tp-border mx-5">
          {list.map((x, index) => (
            <div key={index} className="is-flex is-align-items-center is-justify-content-space-between px-5 mt-3 pb-3 btm-border">
              <h2 className="is-size-5-mobile is-size-3-desktop">{x.judul}</h2>
              <div className="aksi">
                <Link href={"/rencanaBelanja/detail/" + idToko + "/" + x.idRencana}>
                  <button className="button is-size-6-desktop is-size-7-mobile bg-green white">
                    Detail
                  </button>
                </Link>
                <button onClick={handleDelete.bind(this, x.idRencana)} className="button is-size-6-desktop is-size-7-mobile bg-red white ml-1">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RencanaBelanja;
