/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file for the Todo Item Container React component
*/
import './TodoContainer.scss';
import React from 'react';

// Function to toggle completion of the ToDo Item on checkbox click event
document.onclick = (item) => {
    // If clicked on todo div container toggle details
    if (item.target.classList.contains("todo-item")) {
        const details = item.target.querySelector('div');
        details.classList.toggle("not-visible");
        console.log('You have clicked a todo item!');
    }
    // If clicked on todo item title toggle details
    else if (item.target.classList.contains("todo-item-title")) {
        const parent = item.target.parentNode;
        const details = parent.querySelector('div');
        details.classList.toggle("not-visible");
        console.log('You have clicked a todo item!');
    }
}

class TodoContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const items = [];
        return (
            <div id="content">
                {this.props.contents}
            </div>
        );
    }
}

export default TodoContainer;