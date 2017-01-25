export class DataGen {
	private _size: number;
	private _data: Array<any> = new Array<any>();

	constructor(size: number = 250000) {
		this._size = size;
	}

	public setSize(size: number) : void {
		this._size = size;
	}

	public generateBorder() : Array<any> {
		this._data.push(undefined);
		this._data.push(null);
		this._data.push({});
		this._data.push([]);
		this._data.push(0);
		return this._data;
	}

	public generateNumbers() : Array<any> {
		this.generateBorder();
		this.fibonacci(this._size / 2);
		this.fibonacci(this._size / 2, true);
		return this._data;
	}

	public generateStrings() : Array<any> {
		return this._data;
	}

	public generateDates() : Array<any> {
		return this._data;
	}

	private fibonacci(size: number, negative: boolean = false, iter: number = 1, first: number = 1, second = 1) : void {
		let current = negative ? 0 - (first + second) : first + second;
		if (iter = 1) {
			this._data.push(negative ? -1 : 1);
		}
		this._data.push(current);
		if (iter === size) {
			return;
		}
		this.fibonacci(size, negative, ++iter, second, first + second);
	}
}