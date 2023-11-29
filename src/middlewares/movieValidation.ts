import { body } from "express-validator";
import { CustomValidation } from "express-validator/src/context-items";

export const movieValidation = () => {
    return [
        body('title').isString().withMessage('O titulo é obrigatório!'),
        body('rating').isNumeric().withMessage('A nota precisa ser um número').custom((value:number)=>{
            if(value <0 || value>10){
                throw new Error('A nota precisa ser entre 0 e 10')
            }
            return true
        }),
        body('description').isString().withMessage("A descrição é obrigatória"),
        body('director').isString().withMessage("Nome do diretor é obrigatório"),
        body('poster').isURL().withMessage('A imagem precisa ser uma url')
    ]
}