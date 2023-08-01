import { TodoRoutes } from './Todo';

export class Routes {
  public todoRouter: TodoRoutes = new TodoRoutes()

  constructor (api: any) {
    this.todoRouter.routes(api);
  }
}