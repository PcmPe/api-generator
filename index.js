import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser"
import { corsOptions } from "./src/configs/index.js"
import { logger, credentials, verifyJWT } from "./src/middleware/index.js"
import { UserRoutes, AuthRoutes, ProductRoutes , CarRoutes } from './src/routes/index.js'
//TODO: Não importar rota do index? Vale a pena???
const app = express();
const PORT = process.env.PORT;

//Middleware to register requests
app.use(logger);

//Credentials check before CORS!
app.use(credentials);

//Solve CORS
app.use(cors(corsOptions));

//Config JSON response
app.use(express.json());

//Middleware for cookies
app.use(cookieParser());

//Routes
app.use('/cars', CarRoutes);
app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);
app.use("/auth", AuthRoutes);

//Private Routes
//app.use(verifyJWT)

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}!`);
})
