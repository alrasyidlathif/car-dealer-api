import { Response } from 'express'

type HttpStatus = 200 | 201 | 400 | 404 | 500

type ErrMsg = 'SUCCESS' | 'NOT FOUND' | 'INVALID INPUT' | 'ERROR'

class Formatter {
    public static response(res: Response, httpStatus: HttpStatus, error: Boolean, message: ErrMsg, data: any = []): Response {
        return res.status(httpStatus).send(
            {error, message, data,}
        )
    }
}

export {Formatter}