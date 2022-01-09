import db from '../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).end();
    const rencana = await db('rencana_belanja');

    res.status(200);
    res.json({
        data: rencana
    })
}