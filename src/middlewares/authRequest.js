import { decode, verify } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const SECRET = process.env.JWT_KEY;

export const authRequest = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) return res.status(403).json({ message: 'Please log in!' });
        const token = header.split(' ')[1],
            decodedData = verify(token, SECRET);
        req.userData = decodedData;

        next();
    } catch (error) {
        res.status(400).json({ error: error.messsage });
    }
};
