import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LivroLista() {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/livros')
        .then((response) => response.json())
        .then((data) => {
            console.log('Livros recebidos:', data);
            setLivros(data);
        });
    }, []);

    const excluirLivro = async (codigo) => {
        try {
        console.log(`Tentando deletar o livro com o código: ${codigo}`);
        const response = await fetch(`http://localhost:3001/api/livros/${codigo}`, {
            method: 'DELETE',
        });
    
        if (!response.ok) {
            throw new Error('Erro ao deletar o livro');
        }
    
        setLivros((livrosAtuais) => livrosAtuais.filter((livro) => livro.codigo !== codigo));
        console.log(`Livro com o código ${codigo} deletado.`);
        } catch (error) {
        console.error('Erro ao deletar o livro:', error);
        }
    };
  

    return (
        <div className="container mt-5">
        <h1 className="mb-4 text-center">Listagem de Livros</h1>
        <table className="table table-striped table-bordered">
            <thead className="thead-dark">
            <tr>
                <th>Título</th>
                <th>Resumo</th>
                <th>Editora</th>
                <th>Autores</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            {livros.map((livro) => (
                <tr key={livro.codigo}>
                <td>{livro.titulo}</td>
                <td>{livro.resumo}</td>
                <td>{livro.codEditora}</td>
                <td>
                    <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                    </ul>
                </td>
                <td>
                    <button
                    className="btn btn-danger"
                    onClick={() => excluirLivro(livro.codigo)}
                    >
                    Deletar
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
  );
}
