import { Request, Response, NextFunction } from 'express';

export function catchError(controller: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    controller(req, res, next).catch(next);
  };
}

