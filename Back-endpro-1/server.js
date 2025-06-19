import dotenv from "dotenv";
import { Dbconnection } from "./DataBase/mongoose.js";
import express from "express";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js"
import productRouter from "./routes/product.routes.js";

import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from 'connect-mongo'
import orderRouter from "./routes/order.routes.js";
dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/products-api',

    }),
    cookie: {
      secure: false, // Change to true in production with HTTPS
    },
  })
);


app.use(express.json());
app.use(cookieParser());
app.use('/api/images', express.static('./uploads'))

const PORT = process.env.PORT || 5000;


//  routes
app.use("/users", userRouter);
app.use("/category", categoryRouter)
app.use("/products", productRouter)
app.use("/orders", orderRouter)
app.listen(PORT, () => {
  Dbconnection();
  console.log(`app is running on port:${PORT}`);
});
