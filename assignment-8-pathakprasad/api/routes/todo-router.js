/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file to create API routes for ToDo Application 
*/
import express from "express";
import * as todoController from './../controllers/todo-controller.js';

const router = express.Router();

router.route('/todo')
    .post(todoController.post)
    .get(todoController.index);

router.route('/todo/:id')
    .get(todoController.get)
    .put(todoController.update)
    .delete(todoController.remove);

export default router;