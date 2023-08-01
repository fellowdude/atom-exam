import * as express from 'express'
import { TodoController } from '../controllers/Todo'
import { GeneralController } from '../controllers/General'

export class TodoRoutes {
  public todoController: TodoController = new TodoController()
  public generalController: GeneralController = new GeneralController()
  public router: express.Router = express.Router()

  public routes(api: any):any {
    this.router.get('/', this.todoController.read)
    this.router.post('/', this.todoController.create)
    this.router.get('/:id', this.todoController.find)
    this.router.put('/:id', this.todoController.update)
    this.router.delete('/:id', this.todoController.delete)
    //this.router.all('*', this.generalController.notFound)
    
    api.use('/todo', this.router)
  }
}