import db from '../../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    const { idToko, id } = req.query

    const penjualan = await db('penjualan_langsung').where({ idToko, idPl: id }).first();
    const detail = await db('detail_penjualan_langsung').where({ idPl: id })

    const result = {
        judul: penjualan.judul,
        list: detail
    }

    res.json({
        result
    })

}