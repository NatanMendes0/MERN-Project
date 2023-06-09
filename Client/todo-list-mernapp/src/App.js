import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

//parei no minuto 29:35 do video

function App() {
  //variavel para armazenar o texto do input
  const [itemText, setItemText] = useState("");

  //variavel para listar os itens do banco de dados
  const [listItems, setListItems] = useState([]);

  //variavel para mostrar o form de atualização
  const [isUpdating, setIsUpdating] = useState("");

  //variavel para armazenar o id do item que está sendo atualizado
  const [updateItemText, setUpdateItemText] = useState("");

  //adicionar novo item no banco de dados
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        item: itemText,
      });
      setListItems((prev) => [...prev, res.data]);
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

  //função para deletar um item do banco de dados
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      console.log(res.data);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  };

  //função para atualizar um item do banco de dados
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/item/${isUpdating}`,
        { item: updateItemText }
      );
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText("");
      setIsUpdating("");
    } catch (err) {
      console.log(err);
    }
  };
  //antes de atualizar, renderizar o form de atualização
  const renderUpdateForm = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="Novo Item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />
      <button className="update-new-btn" type="submit">
        Atualizar
      </button>
    </form>
  );

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
              {
                //se o id do item for igual ao id do item que está sendo atualizado, mostrar o form de atualização
                isUpdating === item._id ? (
                  renderUpdateForm()
                ) : (
                  <>
                    <p className="item-content">{item.item}</p>
                    <button
                      className="update-item"
                      onClick={() => {
                        setIsUpdating(item._id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="delete-item"
                      onClick={() => {
                        deleteItem(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </>
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
