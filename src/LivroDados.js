import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LivroDados() {
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState('');
    const [editoras, setEditoras] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/api/editoras')
            .then((response) => response.json())
            .then((data) => setEditoras(data));
    }, []);

    const incluir = async (event: React.FormEvent) => {
        event.preventDefault();
        const novoLivro = {
            titulo,
            resumo,
            autores: autores.split('\n'),
            codEditora: Number(codEditora),
        };

        await fetch('http://localhost:3001/api/livros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoLivro),
        });

        navigate('/');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Cadastro de Livro</h1>
            <form onSubmit={incluir}>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        id="titulo"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="resumo">Resumo</label>
                    <textarea
                        id="resumo"
                        className="form-control"
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="autores">Autores</label>
                    <textarea
                        id="autores"
                        className="form-control"
                        value={autores}
                        onChange={(e) => setAutores(e.target.value)}
                        required
                    />
                    <small className="form-text text-muted">
                        Separe os autores por linha.
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="editora">Editora</label>
                    <select
                        id="editora"
                        className="form-control"
                        value={codEditora}
                        onChange={(e) => setCodEditora(e.target.value)}
                        required
                    >
                        <option value="">Selecione a editora</option>
                        {editoras.map((editora) => (
                            <option key={editora.codEditora} value={editora.codEditora}>
                                {editora.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Incluir Livro
                </button>
            </form>
        </div>
    );
}
