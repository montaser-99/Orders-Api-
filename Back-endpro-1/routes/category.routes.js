import express from "express"
import { createcategory,getCategories,getcategory,deletecategory } from "../controllers/category.controller.js"
import { categoryverify } from "../Services/categoryvalidation.js";
import { restrictTo } from "../Middlewares/auth.middleware.js";
const categoryRouter = express.Router();


categoryRouter.post("/create",categoryverify,createcategory)
categoryRouter.get("/get",getCategories)
categoryRouter.get("/get/:id",getcategory)
categoryRouter.delete("/delete/:id", restrictTo('admin'), deletecategory);


export default categoryRouter