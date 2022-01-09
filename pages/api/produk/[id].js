import db from '../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    const { id } = req.query;

    const produk = await db('produk').where({ id }).first();

    res.status(200);
    res.json({
        data: produk
    })
}