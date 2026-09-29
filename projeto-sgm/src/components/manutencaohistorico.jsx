// componenete para carregar o histórico de manutenções

function ManutencaoHistorico({
  orders = [],
  onClearHistory,
  onRestoreJsonDefaults,
}) {
  if (orders.length === 0) return null;

  return (
    <section className="history-section" aria-labelledby="history-title">
      <div className="history-header">
        <h2 id="history-title">Ordens Concluídas ({orders.length})</h2>
        <div className="history-actions">
          <button
            type="button"
            className="btn-restore"
            onClick={onRestoreJsonDefaults}
          >
            Recarregar do JSON
          </button>
          <button type="button" className="btn-clear" onClick={onClearHistory}>
            Limpar histórico
          </button>
        </div>
      </div>

      <ul className="history-list">
        {orders.map((item) => (
          <li key={item.id} className="history-card">
            <div className="card-info">
              <strong>{item.equipment}</strong>
              <span className="badge-mode">{item.service}</span>
              <small>Técnico: {item.technician}</small>
            </div>
            <div className="card-meta">
              <span className="duration">
                {Math.floor(item.durationSeconds / 60)} min
              </span>
              <time className="card-time">{item.completedAt}</time>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default ManutencaoHistorico;
