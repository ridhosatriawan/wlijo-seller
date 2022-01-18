import Head from "next/head";
import Link from "next/link";
import { useState } from 'react';
import Cookies from "js-cookie";
import Router from "next/router";
import Modal from '../components/Modal';

const Navbar = (data) => {
  const [nav, setNav] = useState({
    navBur: "navbar-burger",
    navMen: "navbar-menu"
  })

  const [modal, setModal] = useState("modal");

  function modalHandler() {
    if (modal === "modal") {
      setModal("modal is-active");
    } else {
      setModal("modal");
    }
  }

  function lanjutHandler() {
    modalHandler();
    logoutHandler();
  }

  function handleClick() {
    if (nav.navBur === "navbar-burger") {
      setNav({
        navBur: "navbar-burger is-active",
        navMen: "navbar-menu is-active"
      })
    } else {
      setNav({
        navBur: "navbar-burger",
        navMen: "navbar-menu"
      })
    }
  }

  function logoutHandler() {
    Cookies.remove('token');
    Cookies.remove('idToko');

    Router.replace('/login');

  }

  return (
    <div>
      <Modal modal={modal} text="Mau Keluar ?" lanjutHandler={lanjutHandler} cancelHandler={modalHandler} />
      <Head>
        <title>{data.title}</title>
      </Head>
      <nav
        className="navbar navigasi"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <p className="title green">Wlijo</p>
            </a>
          </Link>

          <a
            role="button"
            className={nav.navBur}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={handleClick.bind(this)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={nav.navMen}>
          <div className="navbar-end">
            <Link href="/">
              <a className="navbar-item">
                Dashboard
              </a>
            </Link>
            <Link href="/produk">
              <a className="navbar-item">
                Produk
              </a>
            </Link>
            <Link href="/rencanaBelanja">
              <a className="navbar-item" >
                Rencana Belanja
              </a>
            </Link>
            <Link href="/penjualan/langsung">
              <a className="navbar-item" >
                Penjualan
              </a>
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                Akun
              </a>

              <div className="navbar-dropdown">
                <a href="#" onClick={modalHandler.bind(this)} className="navbar-item red">
                  Log Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
