export class MemoryDB<T extends { id: string }> {
  private array: Array<T> = [];

  addItem = async (item: T): Promise<T> => {
    this.array.push(item);

    return item;
  };

  getAllItems = async (): Promise<Array<T>> => this.array;

  getOneItemById = async (id: string): Promise<T | null> => {
    return this.array.find((item) => item.id === id) || null;
  };

  getOneItemByField = async (
    value: T[keyof T],
    field: keyof T,
  ): Promise<boolean> => {
    let include = false;
    this.array.forEach((item) => {
      if (item[field] === value) {
        include = true;
      }
    });
    return include;
  };

  updateItem = async (id: string, data: T): Promise<T | null> => {
    const indexItem = this.array.findIndex((item) => item.id === id);

    if (indexItem < 0) {
      return null;
    }

    this.array = [
      ...this.array.slice(0, indexItem),
      data,
      ...this.array.slice(indexItem + 1),
    ];

    return this.array[indexItem];
  };

  removeItem = async (id: string): Promise<boolean | null> => {
    const indexItem = this.array.findIndex((item) => item.id === id);

    if (indexItem < 0) {
      return null;
    }

    this.array = this.array.filter((item) => item.id !== id);

    return true;
  };
}
