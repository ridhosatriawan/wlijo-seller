import db from '../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    const kecamatan = await db('kecamatan');
    const desa = await db('desa');

    const listKec = kecamatan.map(data => {
        return {
            idK: data.idK,
            kecamatan: data.nama_kecamatan
        }
    })

    const listDesa = desa.map(data => {
        return {
            id: data.id,
            idK: data.idK,
            desa: data.nama_desa
        }
    })

    const panjang = listDesa.length;

    res.status(200);
    res.json({
        listKec,
        listDesa
    })
}