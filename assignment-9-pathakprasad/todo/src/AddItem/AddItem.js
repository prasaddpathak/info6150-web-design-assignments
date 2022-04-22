/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file for the Add Todo Item React component
*/
import './AddItem.scss';
import React from 'react';

const enableTodoUI = () => {
    console.log('Clicked enable add!');
    const todo = document.getElementById("add-todo");
    todo.classList.toggle("not-visible");
}

class AddItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description : '',
            date : '',
            time : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.addToDoFromUI = this.addToDoFromUI.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    addToDoFromUI = () => {
        const item = {
            title : this.state.title,
            description : this.state.description,
            due_date : this.state.date,
            time : this.state.time
        }
        console.log(item);

        fetch(
            'http://127.0.0.1:9000/todo', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(item)
            }
        ).then( data => {
            console.log('Added Todo' + data);
        });



    }

    render() {
        return (
            <div id="add-todo" className="not-visible">
            <h2>Add a new To-Do</h2>
            <form onSubmit={this.addToDoFromUI}>
                <div>
                    <label>
                    Title:
                    <input 
                        type="text" 
                        name="title" 
                        value ={this.state.title} 
                        onChange={this.handleChange} 
                        required
                    />
                    </label>
                </div>
                <div>
                    <label>
                    Description:
                    <input 
                        type="text" 
                        name="description" 
                        value ={this.state.description} 
                        onChange={this.handleChange} 
                        required
                    />
                    </label>
                </div>
                <div>
                    <label>
                    Due Date:
                    <input 
                        type="date" 
                        name="date" 
                        value ={this.state.date} 
                        onChange={this.handleChange} 
                        required
                    />
                    </label>
                </div>
                <div>
                    <label>
                    Time:
                    <input 
                        type="time" 
                        name="time" 
                        value ={this.state.time} 
                        onChange={this.handleChange} 
                        required
                    />
                    </label>
                </div>
                <div >
                    <input className="button" type="submit" value="Submit" />
                </div>
            </form>
        </div>
        );
    }
}

export {AddItem, enableTodoUI};