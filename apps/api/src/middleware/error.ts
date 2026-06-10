import { ErrorRequestHandler } from 'express';
import { ApiError } from '../utils/apiError.js';
import { logger } from '../utils/logger.js';
export const errorHandler: ErrorRequestHandler = (err,req,res,next)=>{ const status=err instanceof ApiError?err.statusCode:err?.code===11000?409:err?.name==='ValidationError'?422:err?.name==='CastError'?400:500; const log={message:err.message,stack:err.stack,path:req.path,status}; if(status>=500) logger.error(log); else logger.warn(log); const message=err?.code===11000?'A record with that value already exists':status===500&&process.env.NODE_ENV==='production'?'Server Error':err.message||'Server Error'; res.status(status).json({success:false,message}); };
