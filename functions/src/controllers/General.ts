import { Request, Response } from 'express'

export class GeneralController {
  
  public notFound (req: Request, res: Response) {
    res.status(404).json({ error: 'Not Found!'})
  }
  
}