import Link from 'next/link';

const Sidebar = () =>{
    return(
        <aside className="menu is-hidden-mobile menu">
            <p className="menu-label is-size-5">
            Menu
            </p>
            <ul className="menu-list">
                <li>
                    <Link href="/">
                    <a href="">
                        <span className="icon-text is-size-5">
                            <span className="icon">
                            <i className="far fa-user-circle"></i>
                            </span>
                            <span>Profil</span>
                        </span>
                    </a>
                    </Link>
                </li>
                <li>
                    <Link href="/transaksi">
                    <a href="">
                        <span className="icon-text is-size-5">
                            <span className="icon">
                                <i className="far fa-handshake"></i>
                            </span>
                            <span>Transaksi</span>
                        </span>
                    </a>
                    </Link>
                </li>
                <li>
                <Link href="/pendapatan">
                    <a href="">
                        <span className="icon-text is-size-5">
                            <span className="icon">
                                <i className="far fa-money-bill-alt"></i>
                            </span>
                            <span>Pendapatan</span>
                        </span>
                    </a>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar;