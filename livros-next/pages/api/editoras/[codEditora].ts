import { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditora } from '../../../classes/controle/ControleEditora';

const controleEditora = new ControleEditora();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { codEditora } = req.query;
    if (req.method === 'GET' && typeof codEditora === 'string') {
        const nomeEditora = controleEditora.getNomeEditora(Number(codEditora));
        if (nomeEditora) {
            res.status(200).json({ nome: nomeEditora });
        } else {
            res.status(404).json({ message: 'Editora not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
