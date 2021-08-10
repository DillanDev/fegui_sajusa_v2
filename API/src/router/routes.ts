import { CustomerRoute } from './customer.route';
import { AuthRoute} from './auth.route';
import { ProductRoute } from './product.route';
import { EmployeeRoute } from './employee.route';


export class Route{

    public CustomerRoute: CustomerRoute = new CustomerRoute();
    public AuthRoutes: AuthRoute = new AuthRoute();
    public ProductRoutes: ProductRoute = new ProductRoute();
    public EmployeeRoute: EmployeeRoute = new EmployeeRoute();
}