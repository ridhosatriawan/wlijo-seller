import Link from "next/link";

const Bottom = () => {
    return (
        <nav className="navbar navigasi is-fixed-bottom is-hidden-tablet" role="navigation">
            <div className="navbar-brand">
                <Link href="/">
                    <a className="navbar-item is-expanded  is-block has-text-centered">
                        <i className="far fa-user-circle"></i>
                        <p className="is-size-7">Profil</p>
                    </a>
                </Link>
                <Link href="/transaksi">
                    <a className="navbar-item is-expanded  is-block has-text-centered">
                        <i className="far fa-handshake"></i>
                        <p className="is-size-7">Transaksi</p>
                    </a>
                </Link>
                <Link href="/pendapatan">
                    <a className="navbar-item is-expanded is-block has-text-centered">
                        <i className="far fa-money-bill-alt"></i>
                        <p className="is-size-7">Pendapatan</p>
                    </a>
                </Link>
            </div>
        </nav>
    );
}

export default Bottom;