export interface Filter<I, O> {
  process(input: I): O;
}
