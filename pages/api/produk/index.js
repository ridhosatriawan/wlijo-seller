import db from '../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    const produk = await db('produk');

    res.status(200);
    res.json({
        message: 'Data Produk',
        data: produk
    })
}