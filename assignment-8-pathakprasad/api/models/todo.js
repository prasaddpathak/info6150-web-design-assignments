/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file to store all the Mongo Schema for Todo Collection
*/
import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title : {
        type: String,
        required: 'Title is required.'
    },
    description:{ 
        type: String,
        required: 'Description is required'
    },
    due_date : {
        type: String,
        required: 'Phone number is requried.'
    },
    time: {
        type: String,
        required: 'Deadline time is requried.'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    }
}, {skipVersioning: true});

const model = mongoose.model('todo', Schema);

export default model;