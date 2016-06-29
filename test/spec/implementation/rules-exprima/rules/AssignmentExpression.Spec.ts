import {AssignmentExpression} from "../../../../../implementation/rules-esprima/rules/AssignmentExpression";
import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRuleResult} from "../../../../../lib/.interfaces/rules/rule-result.interface";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 26.06.2016.
 */

describe('class AssignmentExpression', () => {

    let checkResult = (node: ESTree.AssignmentExpression, result: IRuleResult<ESTree.Node>) => {
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
        assert.lengthOf(result.nextNodes, 2, 'nextNodes must have two entries');

        assert.equal(checkNodes(result.nextNodes, 'left', 'right'), true, 'Nodes should be mapped');

        assert.equal(result.assignableName, 'a.b', 'the assigned name should be a.b');


    };

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        let assign = new AssignmentExpression();

        assert.typeOf(AssignmentExpression, 'function');
        assert.instanceOf(assign, AssignmentExpression);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static .helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new AssignmentExpression();
            assert.typeOf(assign.processNode,'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });

        it('should have the right result', () => {
            let assign = new AssignmentExpression();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            result = assign.processNode(getFixture(), undefined);
            checkResult(getFixture(), result);
        });
    });
});


function getFixture() {
    // http://esprima.org/demo/parse.html?code=a.b%20%3D%20c%0A
    return {
        "type": "AssignmentExpression",
        "operator": "=",
        "left": {
            "type": "MemberExpression",
            "computed": false,
            "object": {
                "type": "Identifier",
                "name": "a"
            },
            "property": {
                "type": "Identifier",
                "name": "b"
            }
        },
        "right": {
            "type": "Identifier",
            "name": "c"
        }
    }
}