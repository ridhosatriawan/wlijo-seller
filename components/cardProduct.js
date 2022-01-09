import Link from "next/link"


export default function CardProduct(props) {
    return (
        <div className="box is-flex is-justify-content-space-between" style={{ maxWidth: 370 + "px" }}>
            <div className="is-flex">
                <figure className="image" >
                    <img style={{ width: 100 + "px", height: 100 + "px" }} src={props.data.foto} />
                </figure>
                <div className="mx-2">
                    <h3 className="is-size-7-mobile has-text-weight-bold green" >{props.data.nama}</h3>
                    <p className="is-size-7-mobile ">Harga Jual : </p>
                    <p className="is-size-7-mobile has-text-weight-bold">Rp. {props.data.harga}/{props.data.satuan}</p>
                    <p className="is-size-7-mobile">Stok : </p>
                    <p className="is-size-7-mobile has-text-weight-bold">{props.data.stok} {props.data.satuan}</p>
                </div>
            </div>
            <div className="is-flex is-flex-direction-column">
                <Link href={'/produk/ubah/' + props.data.id}>
                    <button id="btn" className="button is-small bg-green white mb-1">
                        Ubah
                    </button>
                </Link>
                <button id="btn" onClick={props.handleDelete} className="button is-small bg-red white">
                    Hapus
                </button>
            </div>
        </div>
    )
}