import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from './index';  // Verifique o caminho

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  const { codigo } = req.query;

  if (!codigo) {
    console.error('Código do livro não fornecido.');
    return res.status(400).json({ message: 'Código do livro é necessário para deletar.' });
  }

  const codigoNumero = Number(codigo);
  if (isNaN(codigoNumero)) {
    console.error('Código do livro inválido.');
    return res.status(400).json({ message: 'Código inválido.' });
  }

  if (req.method === 'DELETE') {
    try {
      console.log(`Tentando deletar o livro com o código: ${codigoNumero}`);
      const sucesso = controleLivro.excluir(codigoNumero);

      if (sucesso) {
        console.log(`Livro com o código ${codigoNumero} deletado com sucesso.`);
        return res.status(200).json({ message: 'Livro deletado com sucesso!' });
      } else {
        console.error(`Livro com o código ${codigoNumero} não encontrado.`);
        return res.status(404).json({ message: 'Livro não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao deletar o livro:', error);
      return res.status(500).json({ message: 'Erro ao deletar o livro.' });
    }
  } else if (req.method === 'OPTIONS') {
    res.status(200).end();  // Responder a requisições de pré-verificação (CORS preflight)
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
};
