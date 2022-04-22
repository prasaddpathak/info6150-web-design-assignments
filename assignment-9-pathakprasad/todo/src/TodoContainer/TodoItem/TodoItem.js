/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file for the Todo Item React component
*/
import './TodoItem.scss';
import React from 'react';

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    isCompleted = () => {
        this.myRef.current.parentNode.parentNode.classList.toggle("strikethrough");
    }

    enableUpdateTodo = () => {
        console.log('Clicked Update for a Todo Item');
        const todo = document.getElementById("update-todo");
        todo.classList.toggle("not-visible");
        
        const todoId =  this.myRef.current.parentNode.querySelector('div').textContent.split(": ")[1];
        // const todoId = event.target.parentNode.querySelector('div').textContent.split(": ")[1];
        todo.querySelector('h4').textContent = `ID : ${todoId}`;
    
    }

    deleteTodo = () => {
        console.log(`Clicked Delete`);
        const todoId =  this.myRef.current.parentNode.querySelector('div').textContent.split(": ")[1];
        console.log(todoId);

        fetch(
            'http://127.0.0.1:9000/todo/'+todoId, {
                method : 'DELETE'
            }
        ).then( data => {
            console.log('Deleted Todo: ' + todoId + ' Response: ' + data);
        });
    }

    render() {
        return (
            <div className="todo-item">
                <input type="checkbox" ref={this.myRef} onClick= {this.isCompleted.bind(this)}></input>
                <span className ="todo-item-title"> {this.props.itemDetails.title}</span>
                <div className="todo-details not-visible">
                    <div>ID : {this.props.itemDetails._id}</div>
                    <div>Description : {this.props.itemDetails.description}</div>
                    <div>Due Date : {this.props.itemDetails.due_date}</div>
                    <div>Due Time : {this.props.itemDetails.time}</div>
                    <button ref={this.myRef} onClick={this.enableUpdateTodo.bind(this)}>Update</button>
                    <button ref={this.myRef} onClick={this.deleteTodo.bind(this)}> Delete</button>
                </div>
            </div>
        );
    }
}

export default TodoItem;