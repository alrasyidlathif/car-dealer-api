import * as assert from 'assert';
import request from 'supertest';
import express from 'express';
import { App } from "../src/app";
import { CarsController } from '../src/controllers/cars.controller';
import { DB } from '../src/db/db.mock';
import { CarsValidator } from '../src/middlewares/cars.validator';
import { ErrorHandler } from '../src/middlewares/error.handler';
import { Route } from '../src/routes/route';

const baseUrl = `/api/v1`

describe(`Tests The DATA`, function() {
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

  beforeEach(function () {
    new DB().clearCarsTable()
  });

  it(`should return NO CARS`, async () => {
    const response = await request(app.app)
    .get(`${baseUrl}/cars`)
    assert.equal(response.body.data.length, 0)
  });

//   it(`should return NO CARS AFTER CLEAR`, async () => {
//     const car = {
//         brand: 'BMW',
//         color: 'Blue',
//         price: 1000000000,
//         discount: 0.05,
//         payment: ['cash']
//     }

//     await request(app.app)
//     .post(`${baseUrl}/cars`)
//     .send(car)

//     new DB().clearCarsTable()

//     const response = await request(app.app)
//     .get(`${baseUrl}/cars`)
//     assert.equal(response.body.data.length, 0)
//   });

  describe(``, function() {
    const car = {
        brand: 'BMW',
        color: 'Blue',
        price: 1000000000,
        discount: 0.05,
        payment: ['cash']
    }

    let response: any

    beforeEach(async () => {
        await request(app.app)
        .post(`${baseUrl}/cars`)
        .send(car)

        response = await request(app.app)
        .get(`${baseUrl}/cars`)
    });

    it(`should return 1 CAR`, async () => {
        assert.equal(response.body.data.length, 1)
    
        let resultCar = {...response.body.data[0]}
        delete resultCar.id
        assert.deepStrictEqual(car, resultCar)
    
        response = await request(app.app)
        .get(`${baseUrl}/cars/${response.body.data[0].id}`)
        assert.equal(response.body.data.length, 1)
    
        resultCar = {...response.body.data[0]}
        delete resultCar.id
        assert.deepStrictEqual(car, resultCar)
    });

    it(`should UPDATE 1 CAR`, async () => {
        assert.equal(response.body.data.length, 1)
    
        const updateCar = {...response.body.data[0]}
        updateCar.brand = 'Honda'
        updateCar.price = 9000000

        await request(app.app)
        .put(`${baseUrl}/cars`)
        .send(updateCar)

        response = await request(app.app)
        .get(`${baseUrl}/cars/${response.body.data[0].id}`)
        assert.equal(response.body.data.length, 1)
    
        let resultCar = {...response.body.data[0]}
        assert.deepStrictEqual(updateCar, resultCar)
    });

    it(`should DELETE 1 CAR`, async () => {
        assert.equal(response.body.data.length, 1)

        const carId = response.body.data[0].id

        await request(app.app)
        .delete(`${baseUrl}/cars/${carId}`)

        response = await request(app.app)
        .get(`${baseUrl}/cars/${carId}`)
        assert.equal(response.body.data.length, 0)
    });
  })  
})