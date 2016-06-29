import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRuleResult} from "../../../../../lib/.interfaces/rules/rule-result.interface";
import {BreakStatement} from "../../../../../implementation/rules-esprima/rules/BreakStatement";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 27.06.2016.
 */

describe('class BreakStatement', () => {

    let checkResult = (node: ESTree.BreakStatement, result: IRuleResult<ESTree.Node>) => {
        // every name have some entries
        let checkNodes = (nodeResult:Array<any>, ...nodeNames:Array<string>) =>
            nodeNames
                .every((name) => nodeResult.some((rNode) => deepEqual(rNode, node[name])))


        assert.isObject(result, 'result must be an object');
        assert.isNotNull(result, null, 'result must be not null');
        // standard
        assert.equal(result.lloc, 1, 'LLoC must be 1.');
        assert.equal(result.cyclomatic, 0, 'Cyclomatic must be 0.');
        // operators
        assert.isArray(result.operators, 'operators must be an array.');
        assert.lengthOf(result.operators, 1, 'operators.length must be 1.');
        assert.equal(result.operators[0], 'break', 'operators[0] must be break.');

        //nextNodes
        assert.isArray(result.nextNodes, 'nextNodes must be an array.');
        if (node.label) {
            assert.lengthOf(result.nextNodes, 1, 'nextNodes must have one entry/ies');
            assert.equal(checkNodes(result.nextNodes, 'label'), true, 'Nodes should be mapped');
        } else {
            assert.lengthOf(result.nextNodes, 0, 'nextNodes must have zero entry/ies');
            assert.equal(checkNodes(result.nextNodes), true, 'Nodes should be mapped');

        }

    };

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        let assign = new BreakStatement();

        assert.typeOf(BreakStatement, 'function');
        assert.instanceOf(assign, BreakStatement);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static .helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new BreakStatement();
            assert.typeOf(assign.processNode,'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });

        it('should have the right result', () => {
            let assign = new BreakStatement();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            result = assign.processNode(getFixture(), undefined);
            checkResult(getFixture(), result);
            result = assign.processNode(getFixture2(), undefined);
            checkResult(getFixture2(), result);
        });
    });
});


function getFixture() {
    // http://esprima.org/demo/parse.html?code=while(true)%20%7B%0A%09break%3B%09%0A%7D%0A
    return {
        "type": "BreakStatement",
        "label": {
            type: "Identifier",
            name: "test",
        }
    }
}

function getFixture2() {
    // http://esprima.org/demo/parse.html?code=while(true)%20%7B%0A%09break%3B%09%0A%7D%0A
    return {
        "type": "BreakStatement",
        "label": null,
    }
}