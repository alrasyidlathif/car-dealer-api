## Car Dealer REST API

### Features:
1. Create A Car
2. Raed All Cars
3. Read All Car By ID
4. Update A Car
5. Delete A Car

### Endpoint Definition:
1. POST /cars
```
- request
body {
    brand: 'BMW' | 'Honda' | 'Toyota'
    color: string
    price: number
    discount: number
    payment: ['cash'] | ['credit'] | ['cash', 'credit']
}
- response 
status 201
body {
    error: false,
    message: 'SUCCESS',
    data: [],
}
```
2. GET /cars
```
- response 
status 200
body {
    error: false,
    message: 'SUCCESS',
    data: [
        {
            id: string
            brand: 'BMW' | 'Honda' | 'Toyota'
            color: string
            price: number
            discount: number
            payment: ['cash'] | ['credit'] | ['cash', 'credit']
        },
        ...
    ],
}
```
3. GET /cars/:id
```
- response 
status 200
body {
    error: false,
    message: 'SUCCESS',
    data: [
        {
            id: string
            brand: 'BMW' | 'Honda' | 'Toyota'
            color: string
            price: number
            discount: number
            payment: ['cash'] | ['credit'] | ['cash', 'credit']
        }
    ],
}
```
4. PUT /cars
```
- request
body {
    id: string
    brand: 'BMW' | 'Honda' | 'Toyota'
    color: string
    price: number
    discount: number
    payment: ['cash'] | ['credit'] | ['cash', 'credit']
}
- response 
status 201
body {
    error: false,
    message: 'SUCCESS',
    data: [],
}
```
5. DELETE /cars/:id
```
- response 
status 201
body {
    error: false,
    message: 'SUCCESS',
    data: [],
}
```

### Installation:
1. open your terminal/cmd
2. clone this project
3. go to the root directory
4. install all dependencies with run 
```
npm install
```
5. to see the test coverage run
```
npm run coverage
```
6. to build and start the app run
```
npm run build
npm start
```

### Test Coverage:
![Test Coverage][def]

### Stack:
Nodejs, TypeScript, Expressjs (webapp framework), Mocha (test framework), full list see package.json

[def]: coverage.png