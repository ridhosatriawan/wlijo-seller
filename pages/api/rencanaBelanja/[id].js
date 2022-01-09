import db from '../../../libs/db';

export default async function handler(req, res) {
    const { id } = req.query
    if (req.method !== "GET") return res.status(405).end();
    const rencana = await db('rencana_belanja').where({ idToko: id });

    res.status(200);
    res.json({
        data: rencana
    })
}