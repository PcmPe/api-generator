import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser"
import { corsOptions } from "./src/configs/index.js"
import { logger, credentials, verifyJWT } from "./src/middleware/index.js"
import { UserRoutes, AuthRoutes, ProdutoRoutes, IngredienteRoutes, produtoIngredienteRoutes, CarroRoutes } from './src/routes/index.js'
const app = express();
const PORT = 3000

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
app.use('/carros', CarroRoutes);
app.use('/produtos-ingredientes', produtoIngredienteRoutes);
app.use('/ingredientes', IngredienteRoutes);
app.use('/produtos', ProdutoRoutes);
app.use("/users", UserRoutes);
app.use("/auth", AuthRoutes);

//Private Routes
//app.use(verifyJWT)

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}!`);
})
