import { Application, Request, Response, NextFunction } from 'express';
import { Formatter } from '../helpers/formatter';

export interface ErrorHandlerI {
    initErrorHandler: (app: Application) => void
}

export class ErrorHandler implements ErrorHandlerI {
    public initErrorHandler(app: Application): void {
        app.use(function(
            err: Error, 
            req: Request,
            res: Response,
            next: NextFunction
        ) {
            console.log(err.message)
            return Formatter.response(res, 500, true, 'ERROR')
        })
    }
}
