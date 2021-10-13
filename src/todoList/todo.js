import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = () => {
  const list = localStorage.getItem("itemData");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [initialData, setInitialData] = useState("");
  const [item, setItem] = useState(getLocalData());
  const [toggleItem, setToggleItem] = useState(false);
  const [isId, setIsId] = useState("");
  useEffect(() => {
    localStorage.setItem("itemData", JSON.stringify(item));
  }, [item]);

  const editItem = (index) => {
    const curr = item.find((currElement) => {
      return currElement.id === index;
    });
    setInitialData(curr.name);
    setToggleItem(true);
    setIsId(index);
  };

  const addItem = () => {
    if (!initialData) {
      alert("Input box is empty");
    } else if (toggleItem && initialData) {
      setItem(
        item.map((curr) => {
          if (curr.id == isId) {
            curr.name=initialData ;
          }

          return curr;
        })
      );
      setInitialData("");
      setIsId(null);
      setToggleItem(false);
    } else {
      const newObj = {
        id: new Date().getTime().toString(),
        name: initialData,
      };
      setItem([...item, newObj]);
      setInitialData("");
    }
  };

  const delItem = (index) => {
    const newData = item.filter((curr) => {
      return curr.id !== index;
    });
    setItem(newData);
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
               value={initialData}
              onChange={(event) => setInitialData(event.target.value)}
            />
            {toggleItem ? (
              <i className="far fa-edit add-btn" onClick={() => addItem()}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={() => addItem()}></i>
            )}
          </div>
          {/* show our items  */}
          <div className="showItems">
            {item.map((curr) => {
              return (
                <div className="eachItem">
                  <h3>{curr.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curr.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => delItem(curr.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => setItem([])}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
