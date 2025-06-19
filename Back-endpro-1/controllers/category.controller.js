import Category from "../Models/Category.model.js";
import mongoose from "mongoose";
// create category

export const createcategory = async (req, res, next) => {
    try {
        let { name } = req.body;
        let category_data = {
            name: name,
            userId: req.session?._id,
            createdAt: new Date().toString()
        };

        let category = await Category.findOne({ name });
        if (category) {
            return res.status(400).json({ status: "Fail", data: `category with this name: "${name}" already exists` });
        }

        let newcategory = new Category(category_data);
        await newcategory.save();
        res.status(201).json({ status: "success", data: newcategory });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};

// /////////////////////
// Get all categories]
export const getCategories = async (req, res, next) => {
    try {
        let allData = await Category.find()
        if (allData.length === 0)
            return res.status(404).json({ status: "fail", data: `No Categories Inserted Yet ` })

        res.status(200).json({ status: "success", data: allData })
    }
    catch (erorr) { console.log(erorr) }

}

// //////////////////////////
// get by id 
export const getcategory = async (req, res, next) => {
    const { id } = req.params;
    console.log(" Request to get category by ID:", id);

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(" Invalid ID format");
            return res.status(400).json({ status: "fail", data: "Invalid ID format" });
        }

        let category = await Category.findById(id);
        console.log(" Found category:", category);

        if (!category)
            return res.status(404).json({ status: "fail", data: `No Category With This ID : ${id}` });

        return res.status(200).json({ status: "success", data: category });
    }
    catch (error) {
        console.error(" Error in getcategory:", error);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}


// /////

export const deletecategory = async (req, res, next) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "fail", data: "Invalid ID format" });
        }
        let category = await Category.findByIdAndDelete(id)


        if (!category)
            return res.status(404).json({ status: "fail", data: `No Category With This ID : ${id}` })

        res.status(200).json({ status: "success", DeletedCategory: category })
    }
    catch (erorr) { console.log(erorr) }
}

// //////////////////////////