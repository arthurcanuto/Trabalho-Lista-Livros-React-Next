import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados';
import { Menu } from './Menu'; // Verifique se o caminho está correto

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<LivroLista />} />
        <Route path="/cadastro" element={<LivroDados />} />
      </Routes>
    </Router>
  );
}

export default App;
