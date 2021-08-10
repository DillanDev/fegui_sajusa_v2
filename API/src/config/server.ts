import express,{ Application } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

import { Route } from '../router/routes';


export class App{
    public route: Route = new Route();
    app: Application;

    constructor(private port?: number | string){
        this.app = express();
        this.settings();  
        this.middlewares();        
        this.routes();
    }

    private settings(){
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    public middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(fileUpload());
        this.app.use(cors());
    }
    
    private routes(){
        this.route.CustomerRoute.routes(this.app);
        this.route.AuthRoutes.routes(this.app);
        this.route.ProductRoutes.routes(this.app);
        this.route.EmployeeRoute.routes(this.app);
    }


    public async listen(){
        const PORT = this.app.get('port')
        this.app.listen(PORT);
        console.log(`SERVER UP IN PORT: ${PORT}`);
        
    }
    
}