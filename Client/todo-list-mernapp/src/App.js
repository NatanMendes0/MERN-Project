import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <form className="form">
        <input type="text" placeholder="Adicione suas tarefas!" />
        <button type="submit">Adicionar</button>
      </form>
      <div className="todo-listItems">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          
        </ul>    
      </div>
    </div>
  );
}

export default App;
