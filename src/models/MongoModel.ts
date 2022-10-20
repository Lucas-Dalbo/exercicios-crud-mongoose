import { isValidObjectId, Model } from 'mongoose';
import IModel from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

// Classe abstrata Model
abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }

  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findOne({ _id });
  }

  public async read():Promise<T[]> {
    return this._model.find({});
  }

  public async destroy(_id:string) {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);
    return this._model.findOneAndDelete({ _id });
  }
}

export default MongoModel;