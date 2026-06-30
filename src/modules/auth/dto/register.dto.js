import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
            .required()
            .messages({
                "string.empty": "Password is required",
                "string.min": "Password must be at least 8 characters",
                "string.pattern.base": "Password must contain letters and numbers"
            }),

        role: Joi.string().valid("customer", "seller").default("customer")
    })
}

export default RegisterDto