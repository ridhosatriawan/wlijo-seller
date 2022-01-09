import db from '../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { judul, idToko } = req.body;
    const rencana = await db('rencana_belanja').insert({
        idToko,
        judul
    });

    res.status(200);
    res.json({
        message: "ok"
    })

}