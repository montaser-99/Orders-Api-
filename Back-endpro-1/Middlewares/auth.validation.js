import { registervalidation, loginvalidation } from "../Services/uservalidation.js";

export const registerverify = async (req, res, next) => {
    try {
        const { error } = registervalidation.validate(req.body);
        if (error) {
            let errMsg = error.details[0].message;
            return res.status(403).json({ message: errMsg });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginverify = async (req, res, next) => {
    try {
        const { error } = loginvalidation.validate(req.body);
        if (error) {
            let errMsg = error.details[0].message;
            return res.status(403).json({ message: errMsg });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
