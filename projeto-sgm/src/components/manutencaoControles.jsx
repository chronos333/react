// componente para controlar o timer da manutenção  ( permitir pausar, zerar e concluir a manutenção)

function ManutencaoControles({
  isActive,
  onToggleActive,
  onReset,
  onComplete,
  canStart,
  canComplete,
}) {
  return (
    <div className="controls-group">
      <button
        type="button"
        className={`btn-primary ${isActive ? "btn-pause" : "btn-start"}`}
        onClick={onToggleActive}
        disabled={!isActive && !canStart}
        aria-label={
          isActive
            ? "Pausar ordem de manutenção"
            : "Iniciar ordem de manutenção"
        }
      >
        {isActive ? "Pausar" : "Iniciar"}
      </button>

      <button
        type="button"
        className="btn-secondary"
        onClick={onReset}
        aria-label="Zerar o tempo desta ordem de manutenção"
      >
        Zerar
      </button>

      <button
        type="button"
        className="btn-secondary"
        onClick={onComplete}
        disabled={!canComplete}
      >
        Concluir ordem
      </button>
    </div>
  );
}

export default ManutencaoControles;
