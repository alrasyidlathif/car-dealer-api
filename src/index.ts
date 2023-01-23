import express from 'express';
import { App } from "./app";
import { CarsController } from './controllers/cars.controller';
import { DB } from './db/db.mock';
import { CarsValidator } from './middlewares/cars.validator';
import { ErrorHandler } from './middlewares/error.handler';
import { Route } from './routes/route';

const app = new App(
    express(),
    new Route(
        new CarsValidator(
            new DB()
        ),
        new CarsController(
            new DB()
        )
    ),
    new ErrorHandler()
)

app.start(3000)

export {app}