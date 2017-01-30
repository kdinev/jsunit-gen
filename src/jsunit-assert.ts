export class AssertProvider {
	private _provider: Function;
	private _callee: any;

	constructor(provider: Function = null, callee: any = null) {
		this._provider = provider;
	}

	public invoke(params: any[]): any {
		return this._provider.apply(this._callee, params);
	}
}
