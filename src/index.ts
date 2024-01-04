import {app, client} from './app'
//import userPoints from "./router/users"
//import todolistPoints from "./router/todolist"
import cors from "cors"



app.use(cors({
    origin: "*",
    // ?
    //origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders:"Content-Type",
    credentials: true,

}))


//app.use('/users', userPoints);
//app.use('/todolist',todolistPoints)


const port = process.env.PORT || 3001
const startApp = async ()=> {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()

process.on('beforeExit', async () => {
    try {
        console.log("Закрыли подключение к базе данных");
        await client.close();
    } catch (e) {
        console.log(e);
    }
});
