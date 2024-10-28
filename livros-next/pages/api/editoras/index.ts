import { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditora } from '../../../classes/controle/ControleEditora';

const controleEditora = new ControleEditora();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const editoras = controleEditora.getEditoras();
        res.status(200).json(editoras);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
