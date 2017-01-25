import { DataGen } from './jsunit-typegen';
import { Executor } from './jsunit-executor';

export class JSUnitGen {
	private _subject: Object;
	private _executor: Executor;
	constructor(subject: Object = null) {
		this._subject = subject;
		this._executor = new Executor();
	}

	public testMethod(method: Function, paramTypes: Array<string>, inputSetSize: number, tester: Function) {
		let testData = new Array<any>();
		paramTypes.forEach((param) => {
			let generator = new DataGen(inputSetSize);
			switch (param) {
			case "number":
				testData.push(generator.generateNumbers());
				break;
			default:
				break;
			}
		});
		this._executor.execute(method, this, tester, this, testData);
	}
};