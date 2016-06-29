import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRuleResult} from "../../../../../lib/.interfaces/rules/rule-result.interface";
import {ArrayExpression} from "../../../../../implementation/rules-esprima/rules/ArrayExpression";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 26.06.2016.
 */

describe('class ArrayExpression', () => {

    let checkResult = (node: ESTree.ArrayExpression, result: IRuleResult<ESTree.Node>) => {
        // every name have some entries
        let checkNodes = (nodeResult:Array<any>, ...nodeNames:Array<string>) =>
            nodeNames
                .every((name) => nodeResult.some((rNode) => deepEqual(rNode, node[name])))

        assert.isObject(result, 'result must be an object');
        assert.isNotNull(result, null, 'result must be not null');
        // standard
        assert.equal(result.lloc, 0, 'LLoC must be 0.');
        assert.equal(result.cyclomatic, 0, 'Cyclomatic must be 0.');
        // operators
        assert.isArray(result.operators, 'operators must be an array.');
        assert.lengthOf(result.operators, 1, 'operators.length must be 1.');
        assert.equal(result.operators[0], '[]', 'operators[0] must be [].');
        // operands
        assert.isArray(result.operands, 'operands must be an array.');
        assert.lengthOf(result.operands, 1, 'operands.length must be 1.');
        assert.equal(result.operands[0], '<anonymous>', 'operands[0] must be <anonymous>.');

        //nextNodes
        assert.isArray(result.nextNodes, 'nextNodes must be an array.');
        assert.lengthOf(result.nextNodes, 1, 'nextNodes must have 1 entry');

        assert.equal(checkNodes(result.nextNodes, 'elements'), true, 'Nodes should be mapped');



    };

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        let assign = new ArrayExpression();

        assert.typeOf(ArrayExpression, 'function');
        assert.instanceOf(assign, ArrayExpression);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static .helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new ArrayExpression();
            assert.typeOf(assign.processNode,'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });
        
        it('should have the right result', () => {
            let assign = new ArrayExpression();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            result = assign.processNode(getFixture(), undefined);
            checkResult(getFixture(), result);
        });
    });
});


function getFixture() {
    // http://esprima.org/demo/parse.html?code=%5B%5D%0A
    return {
        "type": "ArrayExpression",
        "elements": []
    }
}