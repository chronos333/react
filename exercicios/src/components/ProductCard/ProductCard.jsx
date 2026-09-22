import './ProductCard.css';

function ProductCard({
nome,
preco,
categoria,
descricao,
imagem,
destaque,
oferta,
estoque,
onAddToCart,
onFavorite,
favorito,
onRemove,
onToggleFeatured,
onEdit
}) {
return (
<article
className={`product-card
        ${destaque ? 'featured' : ''}
        ${oferta ? 'sale' : ''}
        ${!estoque ? 'out-of-stock' : ''}
      `}
> <div className="product-image-container"> <img
       src={imagem}
       alt={nome}
       className="product-image"
     />


    {destaque && (
      <span className="product-badge featured-badge">
        Destaque
      </span>
    )}

    {oferta && (
      <span className="product-badge sale-badge">
        Oferta
      </span>
    )}

    {!estoque && (
      <span className="product-badge stock-badge">
        Fora de estoque
      </span>
    )}
  </div>

  <div className="product-info">
    <span className="product-category">
      {categoria}
    </span>

    <h2>{nome}</h2>

    <p className="product-description">
      {descricao}
    </p>

    <p className="product-price">
      R$ {preco.toFixed(2).replace('.', ',')}
    </p>

    <div className="product-actions">
      <button
        className="cart-button"
        onClick={onAddToCart}
        disabled={!estoque}
      >
        {estoque
          ? 'Adicionar ao carrinho'
          : 'Indisponível'}
      </button>

      <button
        className={`favorite-button ${
          favorito ? 'is-favorite' : ''
        }`}
        onClick={onFavorite}
        aria-label="Favoritar produto"
      >
        {favorito ? '❤️' : '♡'}
      </button>
    </div>

    <div className="admin-actions">
      <button
        className="featured-button"
        onClick={onToggleFeatured}
      >
        {destaque
          ? 'Remover destaque'
          : 'Destacar produto'}
      </button>

      <button
        className="edit-button"
        onClick={onEdit}
      >
        Editar
      </button>

      <button
        className="remove-button"
        onClick={onRemove}
      >
        Remover
      </button>
    </div>
  </div>
</article>


);
}

export default ProductCard;
