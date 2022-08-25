import CrudModel from '../interfaces/CrudModel';

export default abstract class Service<T> implements CrudModel<T> {
  public abstract create(_obj: T): Promise<T>;

  public abstract list(): Promise<Array<Partial<T>>>;

  public abstract listById(_id: string): Promise<Partial<T> | null>;

  public abstract update(_obj: T): Promise<Partial<T>>;

  public abstract destroy(_id: string): Promise<void>;
}
