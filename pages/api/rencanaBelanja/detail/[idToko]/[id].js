import db from '../../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    const { idToko, id } = req.query

    const rencana = await db('rencana_belanja').where({ idToko, idRencana: id }).first();
    const detail = await db('detail_rencana_belanja').where({ idRencana: id })

    const result = {
        judul: rencana.judul,
        list: detail
    }

    res.json({
        result
    })

}