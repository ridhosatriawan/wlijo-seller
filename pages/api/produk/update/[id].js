import db from '../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).end();

    const { id } = req.query;
    const { idToko, nama, harga, stok, satuan, foto } = req.body;

    const update = await db('produk')
        .where({ id })
        .update({
            idToko,
            nama,
            harga,
            stok,
            satuan,
            foto
        });

    const updated = await db('produk').where({ id }).first();

    res.status(200);
    res.json({
        message: "updated",
        data: updated
    })
}