import db from '../../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== "PUT") return res.status(405).end();

    const { id } = req.query;
    const { namaToko, password, noWa, alamat, status, foto } = req.body;

    const update = await db('profil')
        .where({ id })
        .update({
            namaToko,
            password,
            noWa,
            alamat,
            status,
            foto
        });

    const updated = await db('profil').where({ id }).first();

    res.status(200);
    res.json({
        message: "updated",
        data: updated
    })
}