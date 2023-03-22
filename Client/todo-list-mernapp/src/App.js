import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  //variavel para armazenar o texto do input
  const [itemText, setItemText] = useState("");

  //variavel para listar os itens do banco de dados
  const [listItems, setListItems] = useState([]);

  //adicionar novo item no banco de dados
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        item: itemText,
      });
      console.log(res);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  //função para mostrar os itens do banco de dados
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/items");
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  return (
    <div className="App">
      <h1>Lista de Tarefas</h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Adicione suas tarefas!"
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <button type="submit">Adicionar</button>
      </form>
      <div className="todo-listItems">
        {
          //mostrar os itens do banco de dados
          listItems.map((item) => (
            <div className="todo-item">
              <p className="item-content">{item.item}</p>
              <button className="update-item">Update</button>
              <button className="delete-item">Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
