import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRuleResult} from "../../../../../lib/.interfaces/rules/rule-result.interface";
import {BinaryExpression} from "../../../../../implementation/rules-esprima/rules/BinaryExpression";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 26.06.2016.
 */

describe('class BinaryExpression', () => {

    let checkResult = (node:ESTree.BinaryExpression, result:IRuleResult<ESTree.Node>) => {
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
        assert.equal(result.operators[0], node.operator, 'operators[0] must be node.operator.');
        // operands

        //nextNodes
        assert.isArray(result.nextNodes, 'nextNodes must be an array.');
        assert.lengthOf(result.nextNodes, 2, 'nextNodes must have 2 entry/ies');

        assert.equal(checkNodes(result.nextNodes, 'left', 'right'), true, 'Nodes should be mapped');


    };

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        let assign = new BinaryExpression();

        assert.typeOf(BinaryExpression, 'function');
        assert.instanceOf(assign, BinaryExpression);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static .helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new BinaryExpression();
            assert.typeOf(assign.processNode, 'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });

        it('should have the right result', () => {
            let assign = new BinaryExpression();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            result = assign.processNode(getFixture(), undefined);
            checkResult(getFixture(), result);
        });
    });
});


function getFixture() {
    // http://esprima.org/demo/parse.html?code=a%3D%202*3
    return {
        "type": "BinaryExpression",
        "operator": "*",
        "left": {
            "type": "Literal",
            "value": 2,
            "raw": "2"
        },
        "right": {
            "type": "Literal",
            "value": 3,
            "raw": "3"
        }
    }
}