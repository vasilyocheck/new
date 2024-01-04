import {app, client} from './app'
import cors from "cors"


app.use(cors({
    origin: "*",
    // ?
    //origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders:"Content-Type",
    credentials: true,
}))

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
