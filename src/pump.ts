import type { Filter } from './filters/interface.js';

export class Pump<I, O> {
  private filters: Filter<any, any>[] = [];

  addFilter<T, U>(filter: Filter<T, U>): Pump<I, U> {
    this.filters.push(filter);
    return this as unknown as Pump<I, U>;
  }

  process(input: I): O {
    return this.filters.reduce(
      (acc, filter) => filter.process(acc),
      input
    ) as unknown as O;
  }
}
