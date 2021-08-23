import { AuthRoute} from './auth.route';
import { ProductRoute } from './product.route';
import { UserRoute } from './user.route';
import { UploadRoute } from './upload.route';
 

export class Route{

    public AuthRoutes: AuthRoute = new AuthRoute();
    public ProductRoutes: ProductRoute = new ProductRoute();
    public UserRoutes: UserRoute = new UserRoute();
    public UploadRoutes: UploadRoute = new UploadRoute();

}