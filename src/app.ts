import express from 'express';
import path from "path";
import cors from "cors"
const { MongoClient } = require('mongodb');
import users from "./router/users";
import dotenv from 'dotenv'
dotenv.config();

export const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../src/static")));

// app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "../src/ejs"));


// Обязательно
app.use(cors())
app.use(users)
export const uri = process.env.URI_MONGO;
export const client = new MongoClient(uri);