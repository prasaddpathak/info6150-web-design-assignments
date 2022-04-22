import { query } from 'express';
import Todo from './../models/todo.js';

export const save = (newContact) => {
    const todo = new Todo(newContact);
    return todo.save();
}

export const search = (query) => {
    const params = {...query};
    return Todo.find(params).exec();
}

export const get = (id) => {
    return Todo.findById(id).exec();
}

export const update = (updatedTodo) => {
    updatedTodo.modifiedDate = new Date();
    return Todo.findByIdAndUpdate(updatedTodo.id,updatedTodo).exec();
}

export const remove = (id) => {
    Todo.findByIdAndDelete(id).exec();
}