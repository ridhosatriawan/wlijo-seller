import db from '../../../libs/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { noWa, password } = req.body;
    const checkUser = await db('profil').where({ noWa }).first();

    if (!checkUser) return res.status(401).end();

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) return res.status(401).end();

    const token = jwt.sign({
        id: checkUser.id,
        email: checkUser.password
    }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.status(200);
    res.json({
        message: 'Login Successfuly',
        token,
        idToko: checkUser.id
    })
}