import * as assert from 'assert';
import request from 'supertest';
import express from 'express';
import { App } from "../src/app";
import { CarsController } from '../src/controllers/cars.controller';
import { DB } from '../src/db/db.mock';
import { CarsValidator } from '../src/middlewares/cars.validator';
import { ErrorHandler } from '../src/middlewares/error.handler';
import { Route } from '../src/routes/route';
import { DBMock } from './object.mock';

const baseUrl = `/api/v1`

describe(`API Call Tests RESPONSE`, function() {
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
  
  describe(`API Call Tests NOT FOUND`, function() {
    it(`should return 404`, async () => {
      const response = await request(app.app)
      .get(`${baseUrl}/not-found`)
      assert.equal(response.status, 404)
      assert.equal(response.body.message, 'NOT FOUND')
    });
  })

  describe(`API Call Tests GET`, function() {
    it(`should return 200`, async () => {
      const response = await request(app.app)
      .get(`${baseUrl}/cars`)
      assert.equal(response.status, 200)
      assert.equal(response.body.message, 'SUCCESS')
    });
  })

  describe(`API Call Tests GET BY ID`, function() {
    it(`should return 200`, async () => {
      const response = await request(app.app)
      .get(`${baseUrl}/cars/123`)
      assert.equal(response.status, 200)
      assert.equal(response.body.message, 'SUCCESS')
    });
  })

  describe(`API Call Tests CREATE`, function() {
    it(`should return 400 no body`, async () => {
      const response = await request(app.app)
      .post(`${baseUrl}/cars`)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car = {
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 201`, async () => {
      const response = await request(app.app)
      .post(`${baseUrl}/cars`)
      .send(car)
      assert.equal(response.status, 201)
      assert.equal(response.body.message, 'SUCCESS')
    });

    const car2 = {
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: {'cash':'cash'}
    }

    it(`should return 400 wrong payment format`, async () => {
      const response = await request(app.app)
      .post(`${baseUrl}/cars`)
      .send(car2)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car3 = {
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: ['cicil']
    }

    it(`should return 400 wrong payment value`, async () => {
      const response = await request(app.app)
      .post(`${baseUrl}/cars`)
      .send(car3)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car4 = {
      brand: 'YAMAHA',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 400 wrong brand`, async () => {
      const response = await request(app.app)
      .post(`${baseUrl}/cars`)
      .send(car4)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car5 = {
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 400 no brand`, async () => {
      const response = await request(app.app)
      .post(`${baseUrl}/cars`)
      .send(car5)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car6 = {
      brand: 'BMW',
      color: 0,
      price: 1000000000,
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 400 wrong color`, async () => {
      const response = await request(app.app)
      .post(`${baseUrl}/cars`)
      .send(car6)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car7 = {
      brand: 'BMW',
      color: 'Blue',
      price: '1000000000',
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 400 wrong price`, async () => {
      const response = await request(app.app)
      .post(`${baseUrl}/cars`)
      .send(car7)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car8 = {
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: '0.05',
      payment: ['cash']
    }

    it(`should return 400 wrong discount`, async () => {
      const response = await request(app.app)
      .post(`${baseUrl}/cars`)
      .send(car8)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car9 = {
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: 'cash'
    }

    it(`should return 400 wrong payment type`, async () => {
      const response = await request(app.app)
      .post(`${baseUrl}/cars`)
      .send(car9)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });
  })
  
  describe(`API Call Tests UPDATE`, function() {
    it(`should return 400 no body`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car = {
      id: '12345',
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 201`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      .send(car)
      assert.equal(response.status, 201)
      assert.equal(response.body.message, 'SUCCESS')
    });

    const car2 = {
      id: '12345',
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: {'cash':'cash'}
    }

    it(`should return 400 wrong payment format`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      .send(car2)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car3 = {
      id: '12345',
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: ['cicil']
    }

    it(`should return 400 wrong payment value`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      .send(car3)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car4 = {
      id: '12345',
      brand: 'YAMAHA',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 400 wrong brand`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      .send(car4)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car5 = {
      id: '12345',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 400 no brand`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      .send(car5)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car6 = {
      id: '12345',
      brand: 'BMW',
      color: 0,
      price: 1000000000,
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 400 wrong color`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      .send(car6)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car7 = {
      id: '12345',
      brand: 'BMW',
      color: 'Blue',
      price: '1000000000',
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 400 wrong price`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      .send(car7)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car8 = {
      id: '12345',
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: '0.05',
      payment: ['cash']
    }

    it(`should return 400 wrong discount`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      .send(car8)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car9 = {
      id: '12345',
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: 'cash'
    }

    it(`should return 400 wrong payment type`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      .send(car9)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });

    const car10 = {
      id: 12345,
      brand: 'BMW',
      color: 'Blue',
      price: 900000000,
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 400 wrong id type`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      .send(car10)
      assert.equal(response.status, 400)
      assert.equal(response.body.message, 'INVALID INPUT')
    });
  })

  describe(`API Call Tests DELETE`, function() {
    it(`should return 201`, async () => {
      const response = await request(app.app)
      .delete(`${baseUrl}/cars/123`)
      assert.equal(response.status, 201)
      assert.equal(response.body.message, 'SUCCESS')
    });
  })
})

describe(`API Call Tests THROW ERROR`, function() {
  const app = new App(
    express(),
    new Route(
        new CarsValidator(
            new DBMock()
        ),
        new CarsController(
            new DBMock()
        )
    ),
    new ErrorHandler()
  )

  describe(`API Call Tests GET THROW ERROR`, function() {
    it(`should return 500`, async () => {
      const response = await request(app.app)
      .get(`${baseUrl}/cars`)
      assert.equal(response.status, 500)
      assert.equal(response.body.message, 'ERROR')
    });
  })

  describe(`API Call Tests GET BY ID THROW ERROR`, function() {
    it(`should return 500`, async () => {
      const response = await request(app.app)
      .get(`${baseUrl}/cars/123`)
      assert.equal(response.status, 500)
      assert.equal(response.body.message, 'ERROR')
    });
  })

  describe(`API Call Tests CREATE THROW ERROR`, function() {
    const car = {
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 500`, async () => {
      const response = await request(app.app)
      .post(`${baseUrl}/cars`)
      .send(car)
      assert.equal(response.status, 500)
      assert.equal(response.body.message, 'ERROR')
    });
  })

  describe(`API Call Tests UPDATE THROW ERROR`, function() {
    const car = {
      id: '12345',
      brand: 'BMW',
      color: 'Blue',
      price: 1000000000,
      discount: 0.05,
      payment: ['cash']
    }

    it(`should return 500`, async () => {
      const response = await request(app.app)
      .put(`${baseUrl}/cars`)
      .send(car)
      assert.equal(response.status, 500)
      assert.equal(response.body.message, 'ERROR')
    });
  })

  describe(`API Call Tests DELETE THROW ERROR`, function() {
    it(`should return 500`, async () => {
      const response = await request(app.app)
      .delete(`${baseUrl}/cars/123`)
      assert.equal(response.status, 500)
      assert.equal(response.body.message, 'ERROR')
    });
  })
})