import { Car, DBI } from "../src/db/db.mock"

export class DBMock implements DBI {
    static carsTable: Car[] = []
    static carAttribute = ['id', 'brand', 'color', 'price', 'discount', 'payment']
    static brandsList = ['BMW', 'Honda', 'Toyota']
    static paymentList = ['cash', 'credit']

    public clearCarsTable = (): void => {
        DBMock.carsTable = []
    }

    public randomIdString = (): string => {
        return Math.floor(Date.now() * Math.random()).toString()
    }

    public findCar = async (id: string): Promise<Car[]> => {
        throw new Error('Mocking Error')
    }

    public deleteCar = async (id: string): Promise<void> => {
        throw new Error('Mocking Error')
    }

    public addCar = async (car: Car): Promise<void> => {
        throw new Error('Mocking Error')
    }

    public updateCar = async (car: Car): Promise<void> => {
        throw new Error('Mocking Error')
    }

    public allCars = async (): Promise<Car[]> => {
        throw new Error('Mocking Error')
    }

    public isCar = (car: Car): Boolean => {
        if (!this.isCarAttributeComplete(car)) return false
        if (!this.isCarAttributeTypeValid(car)) return false
        return true
    }

    private isCarAttributeComplete = (car: Car): Boolean => {
        for (const attribute of DBMock.carAttribute) {
            if (car[attribute] === undefined) return false
        }
        return true
    }

    private isCarAttributeTypeValid = (car: Car): Boolean => {
        if (typeof car.id !== 'string') return false
        if (!DBMock.brandsList.includes(car.brand)) return false
        if (typeof car.color !== 'string') return false
        if (typeof car.price !== 'number') return false
        if (typeof car.discount !== 'number') return false
        for (const payment of car.payment) {
            if (!DBMock.paymentList.includes(payment)) return false
        }
        return true
    }
}