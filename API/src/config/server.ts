import express,{ Application } from "express";
import { Request,Response,NextFunction } from "express";
import morgan from "morgan";

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
        this.app.use(morgan('tiny'));


    }
    

    private routes(){
        this.route.AuthRoutes.routes(this.app);
        this.route.ProductRoutes.routes(this.app);
        this.route.UserRoutes.routes(this.app);
        this.route.UploadRoutes.routes(this.app);
        this.route.UploadRoutes.routes(this.app);
        this.route.BlogRoutes.routes(this.app);
        this.route.ShoppingRoutes.routes(this.app);

    }


    public async listen(){
        const PORT = this.app.get('port')
        this.app.listen(PORT);
        console.log(`SERVER UP IN PORT: ${PORT}`);
        
    }
    
}