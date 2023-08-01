import { Request, Response } from 'express';
import TodoRepository from '../repositories/Todo'

export class TodoController {
    public create (req: Request, res: Response) {
        TodoRepository.create(req.body)
            .then(todo => { res.status(200).json(todo.id)})
            .catch(err => {res.status(500).json(err)});
    }

    public read (req: Request, res: Response) {
        TodoRepository.read()
            .then(todo => {
                let results: Array<{id: string, data: FirebaseFirestore.DocumentData}> = []
                todo.forEach(todo => results.push({ id: todo.id, data: todo.data() }))
                if (results.length) {
                    res.status(200).json(results)
                } else {
                    res.status(404).json({detail: 'No records found'})
                }
            }).catch(err => {res.status(500).json(err)})
    }

    public update (req: Request, res: Response) {
        TodoRepository.update(req.params.id, req.body)
            .then(todo => { res.status(201).json(todo)})
            .catch(err => {res.status(500).json(err)});
    }

    public delete (req: Request, res: Response) { 
        TodoRepository.delete(req.params.id) 
            .then(() => { res.status(200).json({detail: `Todo deleted`}) })
            .catch(err => {res.status(500).json(err)})
    }   

    public find (req: Request, res: Response) {
        TodoRepository.find(req.params.id)
        .then(todo => {
          if (todo.exists) {   
            res.status(200).json(todo.data())
          } else {
            res.status(404).json({detail: 'Not Found'})
          }
        }).catch(err => {res.status(500).json(err)})
    }
}
