import { Request, Response } from 'express';
import TodoRepository from '../repositories/Todo'
import { ITodo } from '../interface/todo.interface'

function isTodo(obj: any): obj is ITodo {
    return 'title' in obj && 'description' in obj && 'completed' in obj;
}
export class TodoController {
    public create (req: Request, res: Response) {
        if(!isTodo(req.body)) res.status(500).json({detail: "Object is incorrect."});
        else { 
            TodoRepository.create({ create_date: new Date(), ...req.body})
            .then((todo: any) => { res.status(200).json(todo.id)})
            .catch((err: any) => {res.status(500).json(err)});
        }
        
    }

    public read (req: Request, res: Response) {
        TodoRepository.read()
            .then((todo: any) => {
                let results: Array<{id: string, data: FirebaseFirestore.DocumentData}> = []
                todo.forEach((todo: any) => results.push({ id: todo.id, data: todo.data() }))
                if (results.length) {
                    res.status(200).json(results)
                } else {
                    res.status(404).json({detail: 'No records found'})
                }
            }).catch((err: any) => {res.status(500).json(err)})
    }

    public update (req: Request, res: Response) {
        if(!isTodo(req.body)) res.status(500).json({detail: "Object is incorrect."});
        else { 
            TodoRepository.update(req.params.id, { update_date: new Date(), ...req.body})
                .then((todo: any) => { res.status(201).json(todo)})
                .catch((err: any) => {res.status(500).json(err)});
        }
    }

    public delete (req: Request, res: Response) { 
        TodoRepository.delete(req.params.id) 
            .then(() => { res.status(200).json({detail: `Todo deleted`}) })
            .catch((err: any) => {res.status(500).json(err)})
    }   

    public find (req: Request, res: Response) {
        TodoRepository.find(req.params.id)
        .then((todo: any) => {
          if (todo.exists) {   
            res.status(200).json(todo.data())
          } else {
            res.status(404).json({detail: 'Not Found'})
          }
        }).catch((err: any) => {res.status(500).json(err)})
    }
}
