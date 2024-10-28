import { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivro } from '../../../classes/controle/ControleLivro';
import Cors from 'cors';

const controleLivro = new ControleLivro();

// Inicialize o CORS
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
});

// Função para rodar middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    const livros = controleLivro.obterLivros();
    
    // Garante que a resposta seja sempre um array, mesmo que vazio
    if (!livros || livros.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(livros);
  } else if (req.method === 'POST') {
    const novoLivro = req.body;
    controleLivro.incluir(novoLivro);
    res.status(200).json({ message: 'Livro inserido com sucesso', livro: novoLivro });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
