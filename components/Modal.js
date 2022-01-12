export default function Modal(props) {
    return (
        <div className={props.modal}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <section className="modal-card-body mx-2 is-flex is-flex-direction-column is-align-items-center">
                    <div className="my-3 title">{props.text}</div>
                    <div className="is-flex">
                        <button onClick={props.lanjutHandler} className="button bg-red mr-2 white">Lanjut</button>
                        <button onClick={props.cancelHandler} className="button">Batal</button>
                    </div>
                </section>
            </div>
        </div>
    )
}