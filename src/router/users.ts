import {Request, Response, Router} from "express";
import cors from "cors";
import {client} from "../app";

const users = Router();
const DB_NAME = "social";
const DB_COLLECTION_USERS = "users";

// Получение тудулистов
users.get("/users", async (req: Request, res: Response) => {
    try {
        // Подключение к базе данных
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

users.post('/users', async (req: Request, res: any) => {
    const { name, age, sex } = req.body;
    try {
        console.log(name);

        // Validate if the user with the given username already exists
        /*const existingUser = await client
            .db(DB_NAME)
            .collection(DB_COLLECTION_USERS)
            .findOne({ name: userName });

        if (existingUser) {
            return res.status(400).json({
                resultCode: 1,
                errorMessage: ["User with this username already exists"],
            });
        }*/

        // If the user does not exist, create a new user
        const newUser = {
            name,
            age,
            sex
            // Add other user properties as needed
        };

        // Insert the new user into the database
        const result = await client
            .db(DB_NAME)
            .collection(DB_COLLECTION_USERS)
            .insertOne(newUser);


            res.json({
                resultCode: 0,
                errorMessage: [],
                data: newUser,
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            resultCode: 1,
            errorMessage: ["Error while processing the request"],
        });
    }
});

export default users;