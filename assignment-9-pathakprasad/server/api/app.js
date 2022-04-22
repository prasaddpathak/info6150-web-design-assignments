/*  
    Author:     Prasad A. Pathak
    NEU ID:     002925486
    Email:      pathak.pra@northeastern.edu
    Subject:    INFO6150 - Web Design and UX
    Purpose:    Javascript file to intitialize the express server
*/
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import model from "./models/index.js";


const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0.tybff.mongodb.net/');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

routes(app);

export default app;