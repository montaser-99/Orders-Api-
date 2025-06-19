import Category from "../Models/Category.model.js";
import Product from "../Models/Product.model.js";
import fs from "fs";
import path from "path";


// create
export const createProduct = async (req, res, next) => {
    try {
        const product = req.body
        const category = await Category.findOne({ name: product.category })
        if (!category)
            return res.status(404).json({ status: "fail", data: `No Category Name Match This Name : ${product.category}` })
        const productData = {
            userId: req.session._id,
            category: product.category,
            categoryId: category._id,
            name: product.name,
            image: req.file ? `/api/images/${req.file.filename}` : "Can't Upload Image",
            description: product.description,
            quantity: 1,
            discount: 0,
            price: product.price,
            createdAt: new Date().toISOString()
        }
        let newProduct = new Product(productData)
        await newProduct.save()
        res.status(201).json({ status: "success", data: newProduct })
    }
    catch (error) {
        console.log(error);
    }


}
// ////////////////////////
export const getAllProducts = async (req, res, next) => {
    try {
        let products = await Product.find()
        if (!products)
            return res.status(404).json({ status: "fail", data: `No Products In This Category` })

        res.status(200).json({ status: "success", data: products })
    } catch (error) {
        console.log(error);
    }

}
// ////////////////////////////////////////////////////////
export const getProduct = async (req, res, next) => {
    try {
       const { id } = req.params

        let product = await Product.findById(id)
        if (!product)
            return res.status(404).json({ status: "fail", data: `No Product With This ID : ${id}` })

        res.status(200).json({ status: "success", data: product })
    } catch (error) {
        console.log(error);
    }

}
// /////////////////////////////////////////////////////////////
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params

        let product = await Product.findByIdAndDelete(id)
        if (!product)
            return res.status(404).json({ status: "fail", data: `No Product With This ID : ${id}` })

        res.status(200).json({ status: "success", Deletedproduct: product })
    } catch (error) {
        console.log(error);
    }

}
// //////////////////////////////////////////////////////////


export const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const newData = req.body;

    try {
        // 1. التحقق من وجود المنتج
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                status: "fail",
                data: `No Product With This ID: ${id}`
            });
        }

        // 2. حذف الصورة القديمة لو فيه صورة جديدة جاية
        let imagePath = product.image; // لو مفيش صورة جديدة، هنستخدم القديمة
        if (req.file) {
            const imageName = product.image?.split("/")[3];
            const deleteOldImagePath = path.join("uploads", imageName);

            try {
                if (fs.existsSync(deleteOldImagePath)) {
                    fs.unlinkSync(deleteOldImagePath);
                }
            } catch (err) {
                console.error("Error deleting old image:", err.message);
            }

            imagePath = `/api/images/${req.file.filename}`;
        }

        // 3. تحديث البيانات
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { ...newData, image: imagePath },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: "success",
            data: updatedProduct
        });}
         catch (error) {
        console.log(error)}}
    

