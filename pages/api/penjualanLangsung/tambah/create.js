import db from '../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { idToko, idPl, list } = req.body;
    const newList = list.map((data) => {
        return {
            idPl,
            idToko,
            nama: data.nama,
            jumlah: data.jumlah,
            harga: data.harga,
            satuan: data.satuan
        }
    })

    try {
        const detail = await db('detail_penjualan_langsung').insert(newList);
        res.status(200);
        res.json({
            list, idToko
        })

    } catch (error) {
        res.status(405);
        res.json(error);
    }

}