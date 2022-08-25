export default interface CrudModel<T> {
  create(obj: T): Promise<T>;
  list(): Promise<Array<Partial<T>>>;
  listById(id: string): Promise<Partial<T> | null>;
  update(obj: T): Promise<Partial<T>>;
  destroy(id: string): Promise<void>;
}
