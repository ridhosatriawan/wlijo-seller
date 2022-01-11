import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
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


const Login = () => {
  const [input, setInput] = useState();
  const [modal, setModal] = useState('modal');
  const [show, setShow] = useState(false);
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setModal('modal is-active');

    const loginReq = await fetch('http://localhost:3000/api/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    if (!loginReq.ok) {
      setShow(true);
      setModal('modal');
    } else {
      const loginRes = await loginReq.json();

      Cookies.set('token', loginRes.token);
      Cookies.set('idToko', loginRes.idToko);
      Router.push('/')
    }

  }

  return (
    <div className="body">
      <Head>
        <title>Login</title>
      </Head>
      <div className={modal}>
        <div className="modal-background"></div>
      </div>
      <div id="login-daftar-container">
        <div className="card login p-5">
          <div className="is-flex is-justify-content-space-between">
            <h4 className="title is-size-4 is-flex is-align-items-center">
              Login
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
                  No. Handphone
                </label>
                <div className="control">
                  <input
                    name="noWa"
                    placeholder="08xxxxxxxxxx"
                    type="text"
                    className="input"
                    onChange={handleChange.bind(this)}
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
                  />
                </div>
                {
                  show ? <div className="red mt-1">No Handphone atau password salah</div> : ""
                }
              </div>
              <button
                type="submit"
                className="button login-daftar-full bg-green white is-size-6-desktop is-size-7-mobile"
              >
                Login
              </button>
              <hr />
              <div>
                <span className="green">
                  Belum Punya Akun ?
                </span>
                <Link href='/daftar'>
                  <a className="green has-text-weight-bold ml-1">
                    Daftar
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

Login.Layout = true;

export default Login;
