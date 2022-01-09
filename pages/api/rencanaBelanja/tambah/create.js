import db from '../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { idToko, idRencana, list } = req.body;
    const newList = list.map((data) => {
        return {
            idRencana,
            idToko,
            nama: data.nama,
            jumlah: data.jumlah,
            satuan: data.satuan
        }
    })

    try {
        const detail = await db('detail_rencana_belanja').insert(newList);
        res.status(200);
        res.json({
            list, idToko
        })

    } catch (error) {
        res.status(405);
        res.json(error);
    }

}