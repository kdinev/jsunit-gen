import { DataGen } from './jsunit-typegen';
import { Executor } from './jsunit-executor';

export class JSUnitGen {
	private _executor: Executor;
	constructor() {
		this._executor = new Executor();
	}

	public testMethod(method: Function, paramTypes: Array<string>, inputSetSize: number, tester: Function) : void {
		
	}
};