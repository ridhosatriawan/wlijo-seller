import db from '../../../libs/db';

export default async function handller(req, res) {
    if (req.method !== "GET") return res.status(405).end();

    const profil = await db('profil');

    res.status(200);
    res.json({
        data: profil
    })
}