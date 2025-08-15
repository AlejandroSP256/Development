import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/users.js'

const app = express()
const port = 3000

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use('/api/users', apiRoutes)

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost${port}`);
})