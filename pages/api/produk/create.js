import db from '../../../libs/db';

export default async function handles(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { idToko, nama, harga, stok, satuan, foto } = req.body;

    const create = await db('produk').insert({
        idToko,
        nama,
        harga,
        stok,
        satuan,
        foto
    });


    res.status(200);
    res.json({
        message: 'Data Berhasil Di Simpan'
    })
}