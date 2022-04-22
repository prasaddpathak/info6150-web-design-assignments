/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file for the Main App React component
*/
import React from 'react';
import './App.scss';
import {AddItem,enableTodoUI} from './AddItem/AddItem';
import TodoContainer from './TodoContainer/TodoContainer';
import UpdateItem from './UpdateItem/UpdateItem';
import TodoItem from './TodoContainer/TodoItem/TodoItem';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items : []
    }
  }

  fetchData() {

    fetch('http://127.0.0.1:9000/todo').then(
      response => {
        response.json().then(
          todo =>{
            console.log("Todo returned!");
            // console.log(todo);
            const itemsFetched = todo.map((i,k) => <TodoItem itemDetails = {i} key={k}></TodoItem>);
            this.setState({
                items : [...itemsFetched]
            });
          }          
        )
      }
    )
}

  render() {
    return (
    <div>
      <h1 className ="title">JS To-Do App</h1>
      <div className ="container">
        <TodoContainer contents = {this.state.items}></TodoContainer>
        <AddItem></AddItem>
        <UpdateItem></UpdateItem>
      </div>
      <div className = "button-container">
            <button id="showButton" onClick={this.fetchData.bind(this)}>Load Content</button>
            <button id="showAddButton" onClick={enableTodoUI}>Add ToDo</button>
        </div>
    </div>
    );
  }
}

export default App;
