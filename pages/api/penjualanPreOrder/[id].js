import db from '../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    const { id } = req.query;
    const data = await db('penjualan_po').where({ idToko: id });
    res.status(200);
    res.json({
        data
    })
}