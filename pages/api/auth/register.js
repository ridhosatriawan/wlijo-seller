import db from '../../../libs/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { password, noWa } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const register = await db('profil').insert({
        noWa,
        password: passwordHash
    })

    const registeredUser = await db('profil').where({ id: register }).first();

    res.status(201);
    res.json({
        message: 'User Registered Successfully',
        data: registeredUser
    })
}