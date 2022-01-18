import db from '../../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).end();

    const { id } = req.query;
    const { idToko, judul, status, alamat } = req.body;

    const update = await db('penjualan_po').where({ idPo: id }).update({
        idToko,
        judul,
        status,
        alamat
    })

    res.status(200);
    res.json({
        message: "updated"
    })
}