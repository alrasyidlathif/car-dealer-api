export type Payments = Array<'cash' | 'credit'>

type Brands = 'BMW' | 'Honda' | 'Toyota'

export type Car = {
    id: string
    brand: Brands
    color: string
    price: number
    discount: number
    payment: Payments
}

type CarAttribute = (keyof Car)[]

type BrandsList = Brands[]

export interface DBI {
    randomIdString: () => string
    clearCarsTable: () => void
    findCar: (id: string) => Promise<Car[]>
    deleteCar: (id: string) => Promise<void>
    addCar: (car: Car) => Promise<void>
    updateCar: (car: Car) => Promise<void>
    allCars: () => Promise<Car[]>
    isCar: (car: Car) => Boolean
}

export class DB implements DBI {
    static carsTable: Car[] = []
    static carAttribute: CarAttribute = ['id', 'brand', 'color', 'price', 'discount', 'payment']
    static brandsList: BrandsList = ['BMW', 'Honda', 'Toyota']
    static paymentList: Payments = ['cash', 'credit']

    public randomIdString = (): string => {
        return Math.floor(Date.now() * Math.random()).toString()
    }

    public clearCarsTable = (): void => {
        DB.carsTable = []
    }

    public findCar = async (id: string): Promise<Car[]> => {
        console.log(await this.connectDB())
        return DB.carsTable.filter(car => car.id == id)
    }

    public deleteCar = async (id: string): Promise<void> => {
        console.log(await this.connectDB())
        DB.carsTable = DB.carsTable.filter(car => car.id != id)
    }

    public addCar = async (car: Car): Promise<void> => {
        console.log(await this.connectDB())
        DB.carsTable.push(this.removeUnusedAttribute(car))
    }

    public updateCar = async (car: Car): Promise<void> => {
        await this.deleteCar(car.id)
        await this.addCar(car)
    }

    public allCars = async (): Promise<Car[]> => {
        console.log(await this.connectDB())
        return DB.carsTable
    }

    public isCar = (car: Car): Boolean => {
        if (!this.isCarAttributeComplete(car)) return false
        if (!this.isCarAttributeTypeValid(car)) return false
        return true
    }

    private isCarAttributeComplete = (car: Car): Boolean => {
        for (const attribute of DB.carAttribute) {
            if (car[attribute] === undefined) return false
        }
        return true
    }

    private isCarAttributeTypeValid = (car: Car): Boolean => {
        if (typeof car.id !== 'string') return false
        if (!DB.brandsList.includes(car.brand)) return false
        if (typeof car.color !== 'string') return false
        if (typeof car.price !== 'number') return false
        if (typeof car.discount !== 'number') return false
        for (const payment of car.payment) {
            if (!DB.paymentList.includes(payment)) return false
        }
        return true
    }

    private removeUnusedAttribute = (car: Car): Car => {
        return {
            'id': car.id,
            'brand': car.brand,
            'color': car.color,
            'price': car.price,
            'discount': car.discount,
            'payment': car.payment,
        }
    }

    private connectDB = (): Promise<string> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Connected To DB');
            }, 1000);
        })
    }
}
