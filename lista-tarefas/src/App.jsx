import Header from "./components/Header";

function App(){
  return(
    <main className="app-container">
      <Header/>
      <section className="app-content">
        <p>Conteúdo principal em desenvolvimento</p>
        <TarefaItem
          titulo="configurar ambiente"
          descricao="Instalar node.js e vs code"/>
        
        <TarefaItem
          titulo="criar aplicaçao vite"
          descricao="Usar o comando npm create"/>


      </section>
    </main>
  );
}

export default App;