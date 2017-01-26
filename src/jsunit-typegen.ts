interface DataGenDescriptor {
	testee: Function;
	testeeContext: any;
	paramTypes: Array<string>;
	testData: Array<any>;
}

export class DataGen {
	private _size: number;
	private _subject: DataGenDescriptor;

	constructor(subject: DataGenDescriptor, size: number = 250000) {
		this._size = size;
		this._subject = subject;
	}

	public getSubject() : DataGenDescriptor {
		return this._subject;
	}

	public setSize(size: number) : void {
		this._size = size;
	}

	public generateCases() : void {
		this._subject.testData = new Array<any>();
		for (let i = 0; i < this._size; i++) {
			let testcase = new Array<any>();
			this._subject.paramTypes.forEach((param) => {
				switch (param) {
				case "number":
					testcase.push(this.generateNumber(i));
					break;
				case "string":
					testcase.push(this.generateString(i));
				default:
					break;
				}
			});
			this._subject.testData.push(testcase);
		}
	}

	public generateBorder(seed: number) : any {
		switch (seed % 5) {
		case 0:
			return undefined;
		case 1:
			return null;
		case 2:
			return {};
		case 3:
			return [];
		default:
			return 0;
		}
	}

	public generateNumber(seed: number) : number {
		if ((seed >> 2) % 11 === 0) {
			return this.generateBorder(seed);
		}
		return this.fibonacci(seed, seed % 2 == 0);
	}

	public generateString(seed: number) : string {
		if ((seed >> 2) % 7 === 0) {
			return this.generateBorder(seed);
		}
		return "";
	}

	public generateDate(seed: number) : Date {
		if ((seed >> 2) % 13 === 0) {
			return this.generateBorder(seed);
		}
		return new Date();
	}

	private fibonacci(size: number, negative: boolean = false, iter: number = 1, first: number = 1, second = 1) : number {
		if (iter = 1) {
			return negative ? -1 : 1;
		}
		if (iter === size) {
			return negative ? 0 - (first + second) : first + second;
		}
		return this.fibonacci(size, negative, ++iter, second, first + second);
	}
}