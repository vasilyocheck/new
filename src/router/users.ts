import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { client } from "../app";

const users = Router();
const DB_NAME = "social";
const DB_COLLECTION_USERS = "users";

// Получение тудулистов
users.get("/users", async (req: Request, res: Response) => {
    try {
        // подключение к базе данных
        //const users = (await client.connect()).db(DB_NAME).collection(DB_COLLECTION_USERS);

        // Получение всех тудулистов
        const usersCollection = (await client.connect()).db(DB_NAME).collection(DB_COLLECTION_USERS);

        // Получение всех пользователей
        const allUsers = await usersCollection.find().toArray();

        // Ответ клиенту на запрос
        res.json({
            resultCode: 0,
            errorMessage: [],
            data: allUsers
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            resultCode: 1,
            errorMessage: ["Моя ошибка при получении данных пользователей из базы данных"],
        });
    }
}, cors());

export default users;