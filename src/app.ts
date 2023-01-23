import { Application, json } from 'express';
import { ErrorHandlerI } from './middlewares/error.handler';
import { RouteI } from './routes/route';

export class App {
    public app: Application
    private route: RouteI
    private errorHandler: ErrorHandlerI
    
    constructor(app: Application, route: RouteI, errorHandler: ErrorHandlerI) {
        this.app = app
        this.route = route
        this.errorHandler = errorHandler
        this.initJsonParser()
        this.initRoute()
    }

    private initJsonParser(): void {
        this.app.use(json())
    }

    private initRoute(): void {
        this.route.initRoute(this.app)
        this.errorHandler.initErrorHandler(this.app)
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}
