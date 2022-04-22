/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file to import all routes
*/

import todoRouter from './todo-router.js';


export default (app) => {
    app.use('/', todoRouter);
}