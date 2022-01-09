import db from '../../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "DELETE") return res.status(405).end();
    const { id, idToko } = req.query

    const rencana = await db('rencana_belanja').where({ idToko, idRencana: id }).del();
    const detail = await db('detail_rencana_belanja').where({ idRencana: id }).del();

    res.status(200);
    res.json({
        message: "deleted"
    })
}