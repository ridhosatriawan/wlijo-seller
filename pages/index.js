import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import cookies from "next-cookies";


export async function getServerSideProps(ctx) {
  const { idToko, token } = cookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const req = await fetch('http://localhost:3000/api/profil/' + idToko);
  const res = await req.json();

  return {
    props: {
      data: res.data
    }
  }

}

const BtnOn = (props) => {

  const { jualan } = props;

  return (
    <button className="button is-large bg-green white" onClick={jualan}>Mulai Jualan</button>
  )
}
const BtnOff = (props) => {
  const { berhenti } = props;
  return (
    <button className="button is-large bg-red white" onClick={berhenti}>Berhenti Jualan</button>
  )
}

const BtnStat = (props) => {
  const { status, jualan, berhenti } = props;

  if (status === "aktif") {
    return <BtnOff berhenti={berhenti} />
  } else {
    return <BtnOn jualan={jualan} />
  }
}

export default function DashboardToko(props) {
  const { id, namaToko, password, desa, kecamatan, noWa, alamat, status, foto } = props.data;
  const [statusToko, setStatusToko] = useState(status);
  const [dataToko, setDataToko] = useState({
    namaToko,
    password,
    noWa,
    desa,
    kecamatan,
    alamat,
    status,
    foto
  })

  function jualan() {
    setStatusToko("aktif");
    fetch('http://localhost:3000/api/profil/update/' + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        namaToko: dataToko.namaToko,
        password: dataToko.password,
        noWa: dataToko.noWa,
        alamat: dataToko.alamat,
        status: "aktif",
        foto: dataToko.foto
      })
    })
  }

  function berhenti() {
    setStatusToko("non");
    const validation = confirm("Berhenti Jualan ?");

    if (validation) {
      fetch('http://localhost:3000/api/profil/update/' + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          namaToko: dataToko.namaToko,
          password: dataToko.password,
          noWa: dataToko.noWa,
          alamat: dataToko.alamat,
          status: "non",
          foto: dataToko.foto
        })
      });
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard Toko</title>
      </Head>
      {/*  */}
      <div className="is-flex">
        <div className="content">
          <div className="has-text-centered is-flex-direction-column bg-green m-5 p-5">
            <div className="is-flex is-justify-content-center">
              <figure className="image is-128x128">
                <img className="is-rounded bg-white" src={dataToko.foto} />
              </figure>
            </div>
          </div>
          <div className="m-5 pb-6">
            <div className="is-flex is-justify-content-end is-align-items-center py-1 ">
              <Link href={"/editToko/" + id}>
                <a className="button bg-green white is-small">Edit Profil</a>
              </Link>
            </div>
            <div className="is-flex is-justify-content-space-between is-align-items-center py-1 btm-bordergray">
              <div className="mx-5">Nama Toko</div>
              <div>
                <div className="panel-block mx-0 pointer">
                  <div>{dataToko.namaToko}</div>
                </div>
              </div>
            </div>
            <div className="is-flex is-justify-content-space-between is-align-items-center py-1 btm-bordergray">
              <div className="mx-5">No Wa</div>
              <div>
                <div className="panel-block mx-0 pointer">
                  <div>{dataToko.noWa}</div>
                </div>
              </div>
            </div>
            <div className="is-flex is-justify-content-space-between is-align-items-center py-1 btm-bordergray">
              <div className="mx-5">Alamat</div>
              <div>
                <div className="panel-block mx-0 pointer">
                  <div>{dataToko.desa} ,{dataToko.kecamatan}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-5 is-flex is-justify-content-center">
            {
              dataToko.desa ?
                <BtnStat status={statusToko} jualan={jualan} berhenti={berhenti} /> :
                <div className="has-text-centered">Lengkapi Data Diri Anda Untuk Mulai Berjualan</div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

