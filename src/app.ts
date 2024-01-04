import express from 'express';
import path from "path";
import cors from "cors"
import dotenv from 'dotenv'
import {MongoClient} from "mongodb";
import users from "./router/users";
dotenv.config()

export const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../src/static")));

// app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "../src/ejs"));


// Обязательно
app.use(cors())
app.use(users)
//app.use(userPoints);
//app.use(todolistPoints);
const uri = 'mongodb+srv://vasilymedvedev1986:helloMongoDB@cluster0.7kaxmgh.mongodb.net/?retryWrites=true&w=majority'
export const client = new MongoClient(uri);