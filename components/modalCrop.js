import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function ModalCrop({ foto, modal, saveCropped, handleChangeImg, cropperRef, onCrop }) {

    return (
        <div className={modal}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <section className="modal-card-body is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                    <div>
                        <Cropper
                            src={foto}
                            style={{ height: 400, width: "100%" }}
                            // Cropper.js options
                            aspectRatio={1 / 1}
                            guides={false}
                            crop={onCrop}
                            ref={cropperRef}
                        />
                    </div>
                    <div className="file">
                        <label className="file-label">
                            <input className="file-input" type="file" onChange={handleChangeImg.bind(this)} name="resume" />
                            <span className="file-cta">
                                <span className="file-label">
                                    Unggah Foto
                                </span>
                            </span>
                        </label>
                    </div>
                    <div>
                        <button className="button" onClick={saveCropped}>
                            Simpan
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}