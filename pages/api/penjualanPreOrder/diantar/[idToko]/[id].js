import db from '../../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    const { id, idToko } = req.query;
    const dataPesanan = await db('pesanan').where({ idPo: id });
    const dataPo = await db('penjualan_po').where({ idToko, idPo: id }).first();
    res.status(200);
    res.json({
        dataPo, dataPesanan
    })
}