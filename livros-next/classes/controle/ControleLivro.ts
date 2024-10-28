export class ControleLivro {
    private livros: Array<any> = [];
    private proximoCodigo: number = 1;

    // Obtém a lista de livros
    obterLivros(): Array<any> {
        return this.livros;
    }

    // Insere um novo livro
    incluir(livro: any): void {
        livro.codigo = this.proximoCodigo++; // Gera um código incremental
        this.livros.push(livro);
    }

    // Exclui um livro com base no código
    excluir(codigo: number): boolean {
        const index = this.livros.findIndex(livro => livro.codigo === codigo);
        if (index !== -1) {
            this.livros.splice(index, 1);
            return true;  // Retorna true se a exclusão foi bem-sucedida
        }
        return false;  // Retorna false se o livro não foi encontrado
    }
}
