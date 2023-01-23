import { Request, Response, NextFunction } from 'express';
import { Car, DBI } from '../db/db.mock';
import { Formatter } from '../helpers/formatter';

export interface CarsControllerI {
    getAllCars: (req: Request, res: Response, next: NextFunction) => void
    getCarById: (req: Request, res: Response, next: NextFunction) => void
    createCar: (req: Request, res: Response, next: NextFunction) => void
    updateCar: (req: Request, res: Response, next: NextFunction) => void
    deleteCarById: (req: Request, res: Response, next: NextFunction) => void
}

export class CarsController implements CarsControllerI {
    private db: DBI

    constructor(db: DBI) {
        this.db = db
    }
    
    public getAllCars = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cars = await this.db.allCars()
            return Formatter.response(
                res,
                200,
                false,
                'SUCCESS',
                cars
            )
        } catch (error) {
            next(error);
        }
    };

    public getCarById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cars = await this.db.findCar(req.params.id)
            return Formatter.response(
                res,
                200,
                false,
                'SUCCESS',
                cars
            )
        } catch (error) {
            next(error);
        }
    };

    public createCar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const car = req.body as Car
            await this.db.addCar(car)
            return Formatter.response(
                res,
                201,
                false,
                'SUCCESS',
            )
        } catch (error) {
            next(error);
        }
    };

    public updateCar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const car = req.body as Car
            await this.db.updateCar(car)
            return Formatter.response(
                res,
                201,
                false,
                'SUCCESS',
            )
        } catch (error) {
            next(error);
        }
    };

    public deleteCarById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.db.deleteCar(req.params.id)
            return Formatter.response(
                res,
                201,
                false,
                'SUCCESS',
            )
        } catch (error) {
            next(error);
        }
    };
}