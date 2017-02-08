import { ParamType } from "../src/jsunit-enums";
import { DataGen, DataGenDescriptor } from "../src/jsunit-typegen";

function sum(x: number, y: number) {
	return x + y;
}

function sumTest(x: number, y: number) {
	return y + x;
}

const descriptor: DataGenDescriptor = {
	paramTypes: [ ParamType.Number, ParamType.Number ],
	subject: sum,
	testData: []
};

const generator = new DataGen(descriptor);
generator.generateCases();
generator.export("testfile.json");
