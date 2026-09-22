import { useState } from 'react';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

function Home() {
const [produtos, setProdutos] = useState([
{
id: 1,
nome: 'Notebook Pro',
preco: 3499.90,
categoria: 'eletrônicos',
descricao: 'Notebook de alto desempenho para trabalho e estudos.',
imagem: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
destaque: true,
oferta: true,
estoque: true
},
{
id: 2,
nome: 'Headset Gamer',
preco: 299.90,
categoria: 'acessórios',
descricao: 'Headset com áudio imersivo para jogos e entretenimento.',
imagem: 'https://images.unsplash.com/photo-1599669454699-248893623440',
destaque: false,
oferta: true,
estoque: true
},
{
id: 3,
nome: 'Teclado Mecânico',
preco: 449.90,
categoria: 'acessórios',
descricao: 'Teclado mecânico confortável e resistente.',
imagem: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
destaque: true,
oferta: false,
estoque: true
},
{
id: 4,
nome: 'Monitor UltraWide',
preco: 1899.90,
categoria: 'eletrônicos',
descricao: 'Monitor ultrawide ideal para produtividade.',
imagem: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf',
destaque: false,
oferta: false,
estoque: false
},
{
id: 5,
nome: 'Mouse Sem Fio',
preco: 159.90,
categoria: 'acessórios',
descricao: 'Mouse sem fio compacto e confortável.',
imagem: 'https://images.unsplash.com/photo-1527814050087-3793815479db',
destaque: false,
oferta: true,
estoque: true
}
]);

const [carrinho, setCarrinho] = useState([]);
const [favoritos, setFavoritos] = useState([]);

const [novoProduto, setNovoProduto] = useState({
nome: '',
categoria: '',
preco: '',
descricao: ''
});

const [erros, setErros] = useState({
nome: '',
categoria: '',
preco: '',
descricao: ''
});

// ID do produto que está sendo editado
const [produtoEditandoId, setProdutoEditandoId] = useState(null);

// Filtros
const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
const [busca, setBusca] = useState('');

function handleInputChange(event) {
const { name, value } = event.target;


setNovoProduto((produtoAtual) => ({
  ...produtoAtual,
  [name]: value
}));

setErros((errosAtuais) => ({
  ...errosAtuais,
  [name]: ''
}));


}

function validarFormulario() {
const novosErros = {};


if (!novoProduto.nome.trim()) {
  novosErros.nome = 'O nome do produto é obrigatório.';
}

if (!novoProduto.categoria.trim()) {
  novosErros.categoria = 'A categoria é obrigatória.';
}

if (!novoProduto.preco || Number(novoProduto.preco) <= 0) {
  novosErros.preco = 'Informe um preço maior que zero.';
}

if (!novoProduto.descricao.trim()) {
  novosErros.descricao = 'A descrição é obrigatória.';
}

setErros(novosErros);

return Object.keys(novosErros).length === 0;


}

// CREATE / UPDATE
function cadastrarProduto(event) {
event.preventDefault();


if (!validarFormulario()) {
  return;
}

// Se existe um ID sendo editado, atualiza o produto
if (produtoEditandoId !== null) {
  setProdutos((produtosAtuais) =>
    produtosAtuais.map((produto) =>
      produto.id === produtoEditandoId
        ? {
            ...produto,
            nome: novoProduto.nome.trim(),
            categoria: novoProduto.categoria.trim(),
            preco: Number(novoProduto.preco),
            descricao: novoProduto.descricao.trim()
          }
        : produto
    )
  );

  limparFormulario();
  return;
}

// Caso contrário, cria um novo produto
const produto = {
  // eslint-disable-next-line react-hooks/purity
  id: Date.now(),
  nome: novoProduto.nome.trim(),
  categoria: novoProduto.categoria.trim(),
  preco: Number(novoProduto.preco),
  descricao: novoProduto.descricao.trim(),
  imagem:
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
  destaque: false,
  oferta: false,
  estoque: true
};

setProdutos((produtosAtuais) => [
  ...produtosAtuais,
  produto
]);

limparFormulario();


}

// READ
function obterProdutosFiltrados() {
return produtos.filter((produto) => {
const correspondeCategoria =
categoriaFiltro === 'todos' ||
produto.categoria.toLowerCase() === categoriaFiltro;


  const correspondeBusca =
    produto.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

  return correspondeCategoria && correspondeBusca;
});


}

// Carrega os dados do produto no formulário
function editarProduto(produto) {
setProdutoEditandoId(produto.id);


setNovoProduto({
  nome: produto.nome,
  categoria: produto.categoria,
  preco: produto.preco.toString(),
  descricao: produto.descricao
});

setErros({
  nome: '',
  categoria: '',
  preco: '',
  descricao: ''
});

// Leva o usuário até o formulário
window.scrollTo({
  top: 0,
  behavior: 'smooth'
});


}

// DELETE
function removerProduto(id) {
setProdutos((produtosAtuais) =>
produtosAtuais.filter((produto) => produto.id !== id)
);


setCarrinho((carrinhoAtual) =>
  carrinhoAtual.filter((produto) => produto.id !== id)
);

setFavoritos((favoritosAtuais) =>
  favoritosAtuais.filter((produto) => produto.id !== id)
);

// Se o produto removido estava sendo editado,
// cancela o modo de edição.
if (produtoEditandoId === id) {
  limparFormulario();
}


}

function alternarDestaque(id) {
setProdutos((produtosAtuais) =>
produtosAtuais.map((produto) =>
produto.id === id
? {
...produto,
destaque: !produto.destaque
}
: produto
)
);
}

function adicionarAoCarrinho(produto) {
setCarrinho((carrinhoAtual) => [
...carrinhoAtual,
produto
]);
}

function alternarFavorito(produto) {
setFavoritos((favoritosAtuais) => {
const jaFavoritado = favoritosAtuais.some(
(item) => item.id === produto.id
);


  if (jaFavoritado) {
    return favoritosAtuais.filter(
      (item) => item.id !== produto.id
    );
  }

  return [...favoritosAtuais, produto];
});


}

function limparFormulario() {
setNovoProduto({
nome: '',
categoria: '',
preco: '',
descricao: ''
});


setErros({
  nome: '',
  categoria: '',
  preco: '',
  descricao: ''
});

setProdutoEditandoId(null);


}

const produtosFiltrados = obterProdutosFiltrados();

const valorCarrinho = carrinho.reduce(
(total, produto) => total + produto.preco,
0
);

return (
<> <Header />


  <main className="home">
    <section className="intro">
      <h2>Bem-vindo à TechStore</h2>

      <p>
        Encontre os melhores produtos de tecnologia.
      </p>
    </section>

    <section className="store-info">
      <div className="info-card">
        <span className="info-label">Produtos</span>
        <strong>{produtos.length}</strong>
      </div>

      <div className="info-card">
        <span className="info-label">Itens no carrinho</span>
        <strong>{carrinho.length}</strong>
      </div>

      <div className="info-card">
        <span className="info-label">Valor do carrinho</span>
        <strong>
          R$ {valorCarrinho.toFixed(2).replace('.', ',')}
        </strong>
      </div>

      <div className="info-card">
        <span className="info-label">Favoritos</span>
        <strong>{favoritos.length}</strong>
      </div>
    </section>

    <section className="product-form-section">
      <h2>
        {produtoEditandoId !== null
          ? 'Editar produto'
          : 'Cadastrar produto'}
      </h2>

      <form
        className="product-form"
        onSubmit={cadastrarProduto}
      >
        <div className="form-group">
          <label htmlFor="nome">Nome</label>

          <input
            id="nome"
            name="nome"
            type="text"
            value={novoProduto.nome}
            onChange={handleInputChange}
            placeholder="Nome do produto"
          />

          {erros.nome && (
            <span className="error-message">
              {erros.nome}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria</label>

          <select
            id="categoria"
            name="categoria"
            value={novoProduto.categoria}
            onChange={handleInputChange}
          >
            <option value="">Selecione uma categoria</option>
            <option value="eletrônicos">
              Eletrônicos
            </option>
            <option value="roupas">
              Roupas
            </option>
            <option value="acessórios">
              Acessórios
            </option>
            <option value="casa">
              Casa
            </option>
          </select>

          {erros.categoria && (
            <span className="error-message">
              {erros.categoria}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço</label>

          <input
            id="preco"
            name="preco"
            type="number"
            min="0"
            step="0.01"
            value={novoProduto.preco}
            onChange={handleInputChange}
            placeholder="0,00"
          />

          {erros.preco && (
            <span className="error-message">
              {erros.preco}
            </span>
          )}
        </div>

        <div className="form-group description-group">
          <label htmlFor="descricao">
            Descrição
          </label>

          <textarea
            id="descricao"
            name="descricao"
            value={novoProduto.descricao}
            onChange={handleInputChange}
            placeholder="Descrição do produto"
            rows="3"
          />

          {erros.descricao && (
            <span className="error-message">
              {erros.descricao}
            </span>
          )}
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="register-button"
          >
            {produtoEditandoId !== null
              ? 'Salvar alterações'
              : 'Cadastrar produto'}
          </button>

          <button
            type="button"
            className="clear-button"
            onClick={limparFormulario}
          >
            {produtoEditandoId !== null
              ? 'Cancelar edição'
              : 'Limpar formulário'}
          </button>
        </div>
      </form>
    </section>

    <section className="filters-section">
      <div className="search-container">
        <label htmlFor="busca">
          Buscar produto
        </label>

        <input
          id="busca"
          type="text"
          value={busca}
          onChange={(event) =>
            setBusca(event.target.value)
          }
          placeholder="Digite o nome do produto..."
        />
      </div>

      <div className="category-filters">
        <span>Categoria:</span>

        <button
          className={
            categoriaFiltro === 'todos'
              ? 'active'
              : ''
          }
          onClick={() => setCategoriaFiltro('todos')}
        >
          Todos
        </button>

        <button
          className={
            categoriaFiltro === 'eletrônicos'
              ? 'active'
              : ''
          }
          onClick={() =>
            setCategoriaFiltro('eletrônicos')
          }
        >
          Eletrônicos
        </button>

        <button
          className={
            categoriaFiltro === 'roupas'
              ? 'active'
              : ''
          }
          onClick={() =>
            setCategoriaFiltro('roupas')
          }
        >
          Roupas
        </button>

        <button
          className={
            categoriaFiltro === 'acessórios'
              ? 'active'
              : ''
          }
          onClick={() =>
            setCategoriaFiltro('acessórios')
          }
        >
          Acessórios
        </button>

        <button
          className={
            categoriaFiltro === 'casa'
              ? 'active'
              : ''
          }
          onClick={() =>
            setCategoriaFiltro('casa')
          }
        >
          Casa
        </button>
      </div>
    </section>

    <section className="products">
      <h2>Produtos disponíveis</h2>

      {produtosFiltrados.length === 0 ? (
        <div className="empty-message">
          <strong>
            Nenhum produto encontrado.
          </strong>

          <p>
            Não existem produtos que correspondam
            aos filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {produtosFiltrados.map((produto) => (
            <ProductCard
              key={produto.id}
              nome={produto.nome}
              preco={produto.preco}
              categoria={produto.categoria}
              descricao={produto.descricao}
              imagem={produto.imagem}
              destaque={produto.destaque}
              oferta={produto.oferta}
              estoque={produto.estoque}
              favorito={favoritos.some(
                (item) => item.id === produto.id
              )}
              onAddToCart={() =>
                adicionarAoCarrinho(produto)
              }
              onFavorite={() =>
                alternarFavorito(produto)
              }
              onRemove={() =>
                removerProduto(produto.id)
              }
              onToggleFeatured={() =>
                alternarDestaque(produto.id)
              }
              onEdit={() => editarProduto(produto)}
            />
          ))}
        </div>
      )}
    </section>
  </main>
</>


);
}

export default Home;