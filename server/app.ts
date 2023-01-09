import express, {
  Request,
  Response,
  Application,
  NextFunction,
} from 'express';

import IPuppies from 'interface';
import puppiesDB from './database';
import cors from "cors";

const app: Application = express();

app.use(cors()) 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const birthdateRegex = /(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d/gm;

const reqValidator = (_req: Request) => {
  if (Object.keys(_req.body).length === 0) { throw new Error('No data provided'); }
  if (!_req.body.breed) { throw new Error('Puppy breed not provided!'); }
  if (!_req.body.name) { throw new Error('Puppy name not provided!'); }
  if (!_req.body.birthdate) { throw new Error('Puppy birthdate not provided!'); }
  if (!_req.body.url) { throw new Error('Image url not provided!'); }
  // if (_req.body.birthdate && !birthdateRegex.test(_req.body.birthdate)) { throw new Error('birthdate must be in DD-MM-YYYY format!'); }
};

const ErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) : void => {
  res
    .status(400)
    .send(err.message);
  next();
};

const newId = (db: Array<IPuppies>) : number => {
  if (db.length === 0) {
    return 1;
  }
  return db.reduce((acc, cur) => (cur.id > acc ? cur.id : acc), 0) + 1;
};

app
  .route('/api/puppies')
  .get((_req: Request, res: Response) => {
    res
      .setHeader('content-type', 'application/json')
      .status(200)
      .json(puppiesDB);
  })
  .post((_req: Request, res: Response) => {
    reqValidator(_req);
    const newPuppy = {
      id: newId(puppiesDB),
      breed: _req.body.breed,
      name: _req.body.name,
      birthdate: _req.body.birthdate,
      url: _req.body.url,
    };
    puppiesDB.push(newPuppy);
    res.setHeader('location', `/api/puppies/${newPuppy.id}`)
      .setHeader('content-type', 'application/json')
      .status(201)
      .json(puppiesDB);
  });
app
  .use(ErrorHandler);

app
  .route('/api/puppies/:id')
  .get((_req: Request, res: Response) => {
    const puppy: IPuppies | undefined = puppiesDB.find(obj => obj.id === Number(_req.params.id));
    if (!puppy) {
      res
        .status(404)
        .send({ message: 'Puppy not found in database' });
    }
    res.setHeader('content-type', 'application/json')
      .status(200)
      .json(puppy);
  })
  .put((_req: Request, res: Response) => {
    const puppy: IPuppies | undefined = puppiesDB.find(obj => obj.id === Number(_req.params.id));
    if (!puppy) {
      return res
        .status(404)
        .send({ message: 'Puppy not found in database' });
    }
    reqValidator(_req);
    puppy.name = _req.body.name;
    puppy.breed = _req.body.breed;
    puppy.birthdate = _req.body.birthdate;
    puppy.url = _req.body.url;
    return res
      .setHeader('location', `/api/puppies/${puppy.id}`)
      .setHeader('content-type', 'application/json')
      .status(201)
      .json(puppy);
  })
  .delete((_req: Request, res: Response) => {
    const index = puppiesDB.findIndex(obj => obj.id === Number(_req.params.id));
    const puppy = puppiesDB[index];
    if (!puppy) {
      return res
        .status(404)
        .send({ message: 'Puppy not found in database' });
    }
    puppiesDB.splice(index, 1);
    return res
      .setHeader('content-type', 'application/json')
      .status(200)
      .json({ message: `( id:${puppy?.id}  Name:${puppy?.name} Breed:${puppy?.breed} ) deleted from database`, puppiesDB });
  });
app
  .use(ErrorHandler);

export default app;
