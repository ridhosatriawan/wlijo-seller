import db from '../../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "DELETE") return res.status(405).end();
    const { id, idToko } = req.query

    const penjualan = await db('penjualan_langsung').where({ idToko, idPl: id }).del();
    const detail = await db('detail_penjualan_langsung').where({ idPl: id }).del();

    res.status(200);
    res.json({
        message: "deleted"
    })
}