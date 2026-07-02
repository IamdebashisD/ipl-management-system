import Joi from "joi"
import BaseDto from "../../../common/dto/base.dto.js"

class ResetPasswordDto extends BaseDto {
    static schema = Joi.object({
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
            .messages({
                "string.empty": "Password is required",
                "string.min": "Password must be at least 8 characters",
                "string.pattern.base": "Password must contain letters and numbers"
            })
            .required()
    })
}


export default ResetPasswordDto