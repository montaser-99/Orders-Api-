
import Joi from 'joi';

export const categoryvalidation=Joi.object({
      name : Joi.string().min(3).max(15).lowercase().trim().required(),
})


export const categoryverify = async (req, res, next) => {
    try {
        const { error } = categoryvalidation.validate(req.body);
        if (error) {
            let errMsg = error.details[0].message;
            return res.status(403).json({ message: errMsg });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};