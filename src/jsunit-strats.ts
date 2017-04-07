export interface IGenerateNumbers {
	execute: Function;
}

export class GenerateNumbers implements IGenerateNumbers {
	public execute(seed: number) {
		return this.usingRandom((Math.floor(Math.random() * 10)) % 2 === 0);
	}

	/**
	 * Returns the n-th fibonacci number.
	 * @param size The requested fibonacci number.
	 * @param negative Flags whether to return the number as negative.
	 * @param iter The current iteration.
	 * @param first The fibonacci number from two iterations ago.
	 * @param second The fibonacci number from one iteration ago.
	 */
	private fibonacci(size: number, negative: boolean = false, first: number = 1, second: number = 1): number {
		let iter = 0;
		let temp;
		if (size === 0) {
			return negative ? -1 : 1;
		}
		while (iter < size) {
			temp = second;
			second = first + second;
			first = temp;
			iter++;
		}
		return negative ? 0 - (first + second) : first + second;
	}

	private usingRandom(negative: boolean): number {
		const number = Math.random() * 250000000;
		return negative ? 0 - number : number;
	}
}
