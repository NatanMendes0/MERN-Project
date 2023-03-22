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
        <div className="todo-item">
          <p className="item-content">Tarefa 1</p>
          <button className="update-item">Update</button>
          <button className="delete-item">Delete</button>
        </div>
        <div className="todo-item">
          <p className="item-content">Tarefa 2</p>
          <button className="update-item">Update</button>
          <button className="delete-item">Delete</button>
        </div>
        <div className="todo-item">
          <p className="item-content">Tarefa 3</p>
          <button className="update-item">Update</button>
          <button className="delete-item">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default App;
