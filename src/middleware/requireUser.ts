import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  console.log('the user is',user)

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireUser;