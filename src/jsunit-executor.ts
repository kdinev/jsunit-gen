import { AssertProvider } from "./jsunit-assert";
import { DataGenDescriptor } from "./jsunit-typegen";

interface ExecutorConfig {
	beforeExecute: Function;
	beforeInstance: Function;
}

interface ExecutionResult {
	actual: any;
	expected: any;
}

interface ExecutionInstance {
	input: any;
	output: ExecutionResult;
}

export class Executor {
	private _config: ExecutorConfig;
	private _provider: AssertProvider = new AssertProvider();
	private _descriptor: DataGenDescriptor;

	constructor(config: ExecutorConfig = null, descriptor: DataGenDescriptor) {
		this._config = config;
		this._descriptor = descriptor;
	}

	public execute(): void {
		// this._config.beforeExecute.apply(this, [testee, data]);

		this._descriptor.testData.forEach((member) => {
			// this._config.beforeInstance.apply(this, [testee, member]);

			this.executeInstance(member);
		});
	}

	public executeInstance(dataMember: any): void {
		const result: ExecutionResult = {
			actual: "",
			expected: this._descriptor.tester.apply(this._descriptor.testerContext, [dataMember])
		};
		const execinstance: ExecutionInstance = {
			input: dataMember,
			output: result
		};

		try {
			result.actual = this._descriptor.testee.apply(this._descriptor.testeeContext, [dataMember]);
		} catch (error) {
			result.actual = error;
		}

		this._provider.invoke([result.actual, result.expected]);
	}
}
