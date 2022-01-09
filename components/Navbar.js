import Head from "next/head";
import Link from "next/link";

const Navbar = (data) => {
  return (
    <div>
      <Head>
        <title>{data.title}</title>
        <script src="/dropdown.js"></script>
      </Head>
      <nav
        className="navbar navigasi"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <img
                src="/user.png"
                className="avatar"
                width="40"
                height="40"
                alt=""
              />
              <h2 className="title is-size-3-desktop is-size-5-mobile pl-2 green">
                Mitra
              </h2>
            </a>
          </Link>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
