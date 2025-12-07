import express, { json } from "express"
import 'dotenv/config'
import axios from 'axios'
import cors from 'cors'
import cookieParser from "cookie-parser";
import ngrok from "@ngrok/ngrok"



const port = process.env.PORT || 3000
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())

// routers 
import { authRouter } from "./src/routers/auth.router.js";
app.use("/api/v1/auth", authRouter)



app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/get-ek", async (req, res) => {
    const response = await axios.post('https://api.openai.com/v1/realtime/client_secrets', {
        "session": {
            "type": "realtime",
            "model": "gpt-realtime"
        }
    },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
            }
        })

    console.log(response.data.value)
    res.status(200).json({
        data:{
            temporaryKey: response.data.value
        }
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
ngrok.connect({ addr: port, authtoken_from_env: true })
    .then(listener => console.log(`Ingress established at: ${listener.url()}`));
