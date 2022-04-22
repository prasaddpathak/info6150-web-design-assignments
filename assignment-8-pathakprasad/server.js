/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file to trigger the express application
*/
import app from "./api/app.js";

const port = 9000;

app.listen(port, () => {
    console.log(`Server running at ${[port]}`)
})