/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file for the Update Todo Item React component
*/
import './UpdateItem.scss';
import React from 'react';

class UpdateItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description : '',
            date : '',
            time : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    updateTodo = (event) => {
        const todoId = event.target.parentNode.parentNode.querySelector('h4').textContent.split(": ")[1];
        console.log(`Updating a todo - ${todoId }`);
        
        const item = {
            title : this.state.title,
            description : this.state.description,
            due_date : this.state.date,
            time : this.state.time
        }
        console.log(item);

        fetch(
            'http://127.0.0.1:9000/todo/'+todoId, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(item)
            }
        ).then( data => {
            console.log('Updated Todo' + data);
        });

    }

    render() {
        return (
        <div id="update-todo" className="not-visible">
            <h2>Update a new To-Do</h2>
            <h4>ID :</h4>

            <form onSubmit={this.updateTodo}>
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

export default UpdateItem;