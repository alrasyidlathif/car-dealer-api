import { Request, Response, NextFunction } from 'express';
import { Car, DBI, Payments } from '../db/db.mock';
import { Formatter } from '../helpers/formatter';

export interface CarsValidatorI {
    getAllCars: (req: Request, res: Response, next: NextFunction) => void
    getCarById: (req: Request, res: Response, next: NextFunction) => void
    createCar: (req: Request, res: Response, next: NextFunction) => void
    updateCar: (req: Request, res: Response, next: NextFunction) => void
    deleteCarById: (req: Request, res: Response, next: NextFunction) => void
}

export class CarsValidator implements CarsValidatorI {
    private db: DBI

    constructor(db: DBI) {
        this.db = db
    }

    public getAllCars = (req: Request, res: Response, next: NextFunction) => {
        return next()
    };

    public getCarById = (req: Request, res: Response, next: NextFunction) => {
        return next()
    };

    private validatePayment = (payment: Payments): Payments => {
        try {
            if (typeof payment !== 'object') return []
            payment = Array(...new Set(payment))
            return payment
        } catch (error) {
            const err = error as Error
            console.log(err.message)
            return []
        }
    }

    public createCar = (req: Request, res: Response, next: NextFunction) => {
        const car = req.body as Car
        if (Object.keys(car).length === 0) return Formatter.response(
            res, 400, true, 'INVALID INPUT'
        );
        const payment = this.validatePayment(car.payment)
        if (payment.length < 1) return Formatter.response(
            res, 400, true, 'INVALID INPUT'
        );
        car.payment = payment
        car.id = this.db.randomIdString()
        if (!this.db.isCar(car)) return Formatter.response(
            res, 400, true, 'INVALID INPUT'
        );
        req.body = {...car}
        return next()
    };

    public updateCar = (req: Request, res: Response, next: NextFunction) => {
        const car = req.body as Car
        if (Object.keys(car).length === 0) return Formatter.response(
            res, 400, true, 'INVALID INPUT'
        );
        const payment = this.validatePayment(car.payment)
        if (payment.length < 1) return Formatter.response(
            res, 400, true, 'INVALID INPUT'
        );
        car.payment = payment
        if (!this.db.isCar(car)) return Formatter.response(
            res, 400, true, 'INVALID INPUT'
        );
        req.body = {...car}
        return next()
    };

    public deleteCarById = (req: Request, res: Response, next: NextFunction) => {
        return next()
    };
}
