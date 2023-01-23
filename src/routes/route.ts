import { Application, Request, Response, NextFunction, Router } from 'express';
import { CarsControllerI } from '../controllers/cars.controller';
import { Formatter } from '../helpers/formatter';
import { CarsValidatorI } from '../middlewares/cars.validator';

export interface RouteI {
    initRoute: (app: Application) => void
}

export class Route implements RouteI {
    private router: Router
    private carsValidator: CarsValidatorI
    private carsController: CarsControllerI

    constructor(carsValidator: CarsValidatorI, carsController: CarsControllerI) {
        this.carsValidator = carsValidator
        this.carsController = carsController
        this.router = Router()
    }
    public initRoute(app: Application): void {
        this.initAvailableRoute(app)
        this.initNotFoundRoute(app)
    }
    private initAvailableRoute(app: Application): void {
        this.router.get(`/cars`, this.carsValidator.getAllCars, this.carsController.getAllCars)
        this.router.get(`/cars/:id`, this.carsValidator.getCarById, this.carsController.getCarById)
        this.router.post(`/cars`, this.carsValidator.createCar, this.carsController.createCar)
        this.router.put(`/cars`, this.carsValidator.updateCar, this.carsController.updateCar)
        this.router.delete(`/cars/:id`, this.carsValidator.deleteCarById, this.carsController.deleteCarById)
        app.use(`/api/v1`, this.router)
    }
    private initNotFoundRoute(app: Application): void {
        app.use(function(req: Request, res: Response, next: NextFunction) {
            return Formatter.response(
                res, 404, true, 'NOT FOUND'
            );
        })
    }
}
