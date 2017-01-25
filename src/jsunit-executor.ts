import { AssertProvider } from './jsunit-assert';

interface ExecutorConfig {
	beforeExecute: Function,
	beforeInstance: Function
}

export class Executor {
	private _config: ExecutorConfig;
	private _provider: AssertProvider = new AssertProvider();

	constructor (config: ExecutorConfig = null) {
		this._config = config;
	}

	public execute(testee: Function, testeeContext: any, tester: Function, testerContext: any, data: Array<any>): void {
		//this._config.beforeExecute.apply(this, [testee, data]);

		data.forEach((member) => {
			//this._config.beforeInstance.apply(this, [testee, member]);

			this.executeInstance(testee, testeeContext, tester, testerContext, member);
		});
	}

	public executeInstance(testee: Function, testeeContext: any, tester: Function, testerContext: any, dataMember: any): void {
		let expected = tester.apply(testerContext, [dataMember]), 
			actual;
		try {
			actual = testee.apply(testeeContext, [dataMember]);
		} catch (error) {
			throw new Error(error);
		}

		this._provider.invoke([actual, expected]);
	}
}