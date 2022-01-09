import Head from "next/head";

const Daftar = () => {
  return (
    <div className="body">
      <Head>
        <title>Daftar</title>
      </Head>
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
            <form>
              <div className="form-group mb-5">
                <label htmlFor="inputNama" className="label">
                  Nama Lengkap
                </label>
                <div className="control">
                  <input
                    name="namaLengkap"
                    placeholder="Angel"
                    type="text"
                    className="input"
                  />
                </div>
              </div>
              <div className="form-group mb-5">
                <label htmlFor="inputNama" className="label">
                  No. Handphone
                </label>
                <div className="control">
                  <input
                    name="noHp"
                    placeholder="08xxxxxxxxxx"
                    type="text"
                    className="input"
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
                  />
                </div>
              </div>
              <button
                type="submit"
                className="button login-daftar-full bg-green white is-size-6-desktop is-size-7-mobile"
              >
                Daftar
              </button>
              <hr />
              <div className="green is-flex is-justify-content-space-between">
                <a className="green" href="">
                  Sudah Punya Akun ?
                </a>
                <a className="green" href="/login">
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daftar;
