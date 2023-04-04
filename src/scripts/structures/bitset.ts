export default class BitSet {
  private _value: number;

  constructor(value: number = 0) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  public test(bit: number): boolean {
    return ((this._value >> bit) & 1) === 1;
  }

  public set(bit: number) {
    this._value |= 1 << bit;
  }

  public clear(bit: number) {
    this._value &= ~(1 << bit);
  }

  public binary(bits: number = 8) {
    return this._value.toString(2).padStart(bits, "0");
  }
}
