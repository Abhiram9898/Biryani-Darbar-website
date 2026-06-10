import { ZodTypeAny } from 'zod';
import { Request,Response,NextFunction } from 'express';
export const validate = (schema: ZodTypeAny) => (req:Request,res:Response,next:NextFunction) => { const parsed=schema.safeParse(req.body); if(!parsed.success) return res.status(422).json({success:false,errors:parsed.error.flatten()}); req.body=parsed.data; next(); };
