/**
 * Data Generator Classes and Interfaces.
 * <p>
 * Data Generator classes used to generate different types of data
 * inputs, given a parameter type list for the data is provided
 * <p>
 */

import { writeFile } from "fs";
import { ParamType } from "./jsunit-enums";
import { GenerateNumbers, IGenerateNumbers } from "./jsunit-strats";

/**
 * Descriptor of the test subject data is going to be generated for.
 */
export interface DataGenDescriptor {
	/**
	 * The size of the {@link DataGenDescriptor.testData} array that will be generated.
	 */
	dataSize?: number;
	/**
	 * The subject function data is going to be generated for.
	 */
	subject?: Function;
	/**
	 * Parameter list for the arguments the function takes.
	 * Data can be generated only for the parameter list, even if a function is not provided.
	 * <p>
	 * Given paramTypes input of the form: [ ParamType.Number, ParamType.String, ParamType.Date ]
	 * The {@link DataGenDescriptor.testData} array will be populated with arrays of type [ number, string, Date ]
	 * </p>
	 */
	paramTypes: ParamType[];
	/**
	 * The output of the generator.
	 */
	testData?: any[];

	numberStrat?: IGenerateNumbers;
}

/**
 * Data generator and exporter.
 */
export class DataGen {
	/**
	 * Descriptor for the data generation subject.
	 */
	public includeBorder: boolean = true;
	/**
	 * Default size for the data if no {@link DataGenDescriptor.dataSize} is provided.
	 */
	private _size: number = 10000;
	/**
	 * Descriptor for the data generation subject.
	 */
	private _subject: DataGenDescriptor;

	/**
	 * Constructor
	 * @param subject Descriptor for the data generation subject.
	 */
	constructor(subject: DataGenDescriptor) {
		this._subject = subject;
		if (!this._subject.dataSize) {
			this._subject.dataSize = this._size;
		}
		if (!this._subject.numberStrat) {
			this._subject.numberStrat = new GenerateNumbers();
		}
	}

	/**
	 * Gets a reference to the data generation subject descriptor
	 * @returns Descriptor for the data generation subject.
	 */
	public getSubject(): DataGenDescriptor {
		return this._subject;
	}

	/**
	 * Generates data for the {@link DataGenDescriptor}
	 */
	public generateData(): void {
		this._subject.testData = [];
		for (let i = 0; i < this._subject.dataSize; i++) {
			const testcase: any[] = [];
			this._subject.paramTypes.forEach((param) => {
				switch (param) {
				case ParamType.Number:
					testcase.push(this.generateNumber(Math.floor(Math.random() * 9)));
					break;
				case ParamType.String:
					testcase.push(this.generateString(i));
					break;
				case ParamType.Date:
					testcase.push(this.generateDate(i));
					break;
				default:
					break;
				}
			});
			this._subject.testData.push(testcase);
		}
	}

	/**
	 * Generates border conditions data.
	 * @param seed A random seed.
	 */
	public generateBorder(seed: number): any {
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

	/**
	 * Generates numbers.
	 * @param seed A random seed.
	 */
	public generateNumber(seed: number): number {
		if (this.includeBorder && (seed % 11 === 0)) {
			return this.generateBorder(seed);
		}
		return this._subject.numberStrat.execute(seed);
	}

	/**
	 * Generates strings.
	 * @param seed A random seed.
	 */
	public generateString(seed: number): string {
		if (this.includeBorder && (seed % 7 === 0)) {
			return this.generateBorder(seed);
		}
		return "";
	}

	/**
	 * Generates dates.
	 * @param seed A random seed.
	 */
	public generateDate(seed: number): Date {
		if (this.includeBorder && (seed % 13 === 0)) {
			return this.generateBorder(seed);
		}
		return new Date();
	}

	/**
	 * Exports the generated data to a file.
	 * @param fileName The name of the file to export to.
	 */
	public export(fileName: string): void {
		writeFile(fileName, JSON.stringify(this._subject), (error) => {
			if (error) {
				writeFile(fileName, error);
			}
		});
	}
}
