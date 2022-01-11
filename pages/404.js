import Link from 'next/link'

export default function FourOhFour() {
    return (
        <div className='container is-flex is-justify-content-center is-align-items-center' style={{ height: 80 + "vh" }}>
            <div className='is-flex is-flex-direction-column is-align-items-center'>
                <img src='/logo.png' className='mb-3' width={80 + "px"} />
                <h1 className='title has-text-centered'>404</h1>
                <h2 className='subtitle'>Not Found</h2>
                <p>Anda Menjelajah</p>
                <p>Terlalu Jauh</p>
                <Link href='/'>
                    <button className='button is-small green mt-2'>Kembali</button>
                </Link>
            </div>
        </div>
    )
}