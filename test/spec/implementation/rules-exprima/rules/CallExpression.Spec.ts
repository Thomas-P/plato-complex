import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRule} from "../../../../../lib/.interfaces/rules/rule.interface";
import {CallExpression} from "../../../../../implementation/rules-esprima/rules/CallExpression";
import {getDeepEntry} from "../../../../../lib/.helper/getDeepEntry";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 27.06.2016.
 */



describe('class CallExpression', () => {

    let checkNode = (settings, assignedName, iRule:IRule, ...nodeNames:Array<string>) =>
        (node:ESTree.CallExpression) => {
            // every name have some entries
            let checkNodes = (nodeResult:Array<any>) =>
                nodeNames
                    .every((name) => nodeResult.some((rNode) => deepEqual(rNode, node[name])))

            let result = iRule.processNode(node, settings, assignedName);

            assert.isObject(result, 'result must be an object');
            assert.isNotNull(result, null, 'result must be not null');
            // standard
            if (getDeepEntry(node, 'callee', 'type') === 'FunctionExpression') {
                assert.equal(result.lloc, 1, 'LLoC must be 1.');
            } else {
                assert.equal(result.lloc, 0, 'LLoC must be 0.');

            }
            assert.equal(result.cyclomatic, 0, 'Cyclomatic must be 0.');
            // operators
            assert.isArray(result.operators, 'operators must be an array.');
            assert.lengthOf(result.operators, 1, 'operators.length must be 1.');
            assert.equal(result.operators[0], '()', 'operators[0] must be ().');

            //nextNodes
            assert.isArray(result.nextNodes, 'nextNodes must be an array.');
            assert.lengthOf(result.nextNodes, 2, 'nextNodes must have one entry/ies');
            assert.equal(checkNodes(result.nextNodes), true, 'Nodes should be mapped');
        };

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        let assign = new CallExpression();

        assert.typeOf(CallExpression, 'function');
        assert.instanceOf(assign, CallExpression);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static .helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new CallExpression();
            assert.typeOf(assign.processNode, 'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });

        it('should have the right result', () => {
            let assign = new CallExpression();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            let check = checkNode(undefined, undefined, assign, 'arguments', 'callee');
            check(getFixture());
            check(getFixture2());
        });
    });
});


function getFixture() {
    // http://esprima.org/demo/parse.html?code=while(true)%20%7B%0A%09break%3B%09%0A%7D%0A
    return {
        "type": "CallExpression",
        "callee": {
            "type": "Identifier",
            "name": "test"
        },
        "arguments": []
    }
}

function getFixture2() {
    // http://esprima.org/demo/parse.html?code=(function(a%2C%20b)%7B%7D)()%3B
    return {
        "type": "CallExpression",
        "callee": {
            "type": "FunctionExpression",
            "id": null,
            "params": [
                {
                    "type": "Identifier",
                    "name": "a"
                },
                {
                    "type": "Identifier",
                    "name": "b"
                }
            ],
            "defaults": [],
            "body": {
                "type": "BlockStatement",
                "body": []
            },
            "generator": false,
            "expression": false
        },
        "arguments": []
    }
}