import * as Joi from '@hapi/joi'
import { Salary } from "./salary.interface"


 export const SalaryValidetor = (salary:Salary) => {
    const SalaryShcema = Joi.object<Salary>({
        id: Joi.number(),
        salary: Joi.number().required(),
        effective_date:Joi.date().required()
    })

    return SalaryShcema.validate(salary)
}