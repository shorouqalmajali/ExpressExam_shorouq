import * as Joi from '@hapi/joi'
import { User } from "./user.interface"

export const UserValidetor =  (user: User) => {
     const UserShcema = Joi.object<User>({
         
        id:Joi.number(),
        email: Joi.string().email().required(),
        firstname: Joi.string().max(255),
        lastname:Joi.string().max(255),
        password: Joi.string().min(4).max(255).required()
    })

    return UserShcema.validate(user)
}