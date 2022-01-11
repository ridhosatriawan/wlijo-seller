import Head from "next/head";
import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import cookies from "next-cookies";

export async function getServerSideProps(ctx) {
  const { token } = cookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

const Daftar = () => {
  const [input, setInput] = useState();
  const [isPass, setIsPass] = useState(true);
  const [modal, setModal] = useState('modal')

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value
    })
    setIsPass(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const pas = input.password;
    const con = input.konPassword;

    if (pas === con) {
      setModal('modal is-active');
      sendData();
    } else {
      setIsPass(false);
    }
  }

  function sendData() {
    fetch('http://localhost:3000/api/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nama: input.nama,
        noWa: input.noWa,
        password: input.password
      })
    }).then(Router.push("/login"))
  }

  return (
    <div className="body">
      <Head>
        <title>Daftar</title>
      </Head>
      <div className={modal}>
        <div className="modal-background"></div>
      </div>
      <div id="login-daftar-container">
        <div className="card daftar p-5">
          <div className="is-flex is-justify-content-space-between">
            <h4 className="title is-size-4 is-flex is-align-items-center">
              Daftar
            </h4>
            <div>
              <figure className="image is-64x64">
                <img src="logo.png" alt="" />
              </figure>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit.bind(this)}>
              <div className="form-group mb-5">
                <label htmlFor="inputNama" className="label">
                  Nama
                </label>
                <div className="control">
                  <input
                    name="nama"
                    placeholder="Angel"
                    type="text"
                    className="input"
                    onChange={handleChange.bind(this)}
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-5">
                <label htmlFor="inputNama" className="label">
                  No. Handphone
                </label>
                <div className="control">
                  <input
                    name="noWa"
                    placeholder="08xxxxxxxxxx"
                    type="text"
                    className="input"
                    onChange={handleChange.bind(this)}
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-5">
                <label htmlFor="inputNama" className="label">
                  Password
                </label>
                <div className="control">
                  <input
                    name="password"
                    placeholder="*******"
                    type="password"
                    className="input"
                    onChange={handleChange.bind(this)}
                    minLength={8}
                  />
                </div>
              </div>
              <div className="form-group mb-5">
                <label htmlFor="inputNama" className="label">
                  Konfirmasi Password
                </label>
                <div className="control">
                  <input
                    name="konPassword"
                    placeholder="*******"
                    type="password"
                    className="input"
                    onChange={handleChange.bind(this)}
                  />
                </div>
                {
                  isPass ? "" :
                    <div className="red mt-1">
                      Password tidak cocok
                    </div>
                }
              </div>
              <button
                type="submit"
                className="button login-daftar-full bg-green white is-size-6-desktop is-size-7-mobile"
              >
                Daftar
              </button>
              <hr />
              <div className="">
                <span className="green">
                  Sudah Punya Akun ?
                </span>
                <Link href='/login'>
                  <a className="green has-text-weight-bold ml-1" href="/login">
                    Login
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Daftar.Layout = true;

export default Daftar;
