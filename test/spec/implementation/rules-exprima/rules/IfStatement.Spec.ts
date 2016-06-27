import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRuleResult} from "../../../../../lib/rule/rule-result.interface";
import {IRule} from "../../../../../lib/rule/rule.interface";
import {settings} from "cluster";
import {IfStatement} from "../../../../../implementation/rules-esprima/rules/IfStatement";
import {getDeepEntry} from "../../../../../lib/helper/getDeepEntry";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 27.06.2016.
 */



describe('class IfStatement', () => {

    let checkNode = (iRule:IRule, ...nodeNames:Array<string>) =>
        (settings, assignedName) =>
            (node:ESTree.IfStatement) => {
                // every name have some entries
                let checkNodes = (nodeResult:Array<any>) =>
                    nodeNames
                        .every((name) => nodeResult.some((rNode) => node[name] && deepEqual(rNode, node[name])))

                let countNodes = nodeNames.filter((name) => !! node[name]).length;

                let result = iRule.processNode(node, settings, assignedName);

                assert.isObject(result, 'result must be an object');
                assert.isNotNull(result, null, 'result must be not null');
                // standard
                if (node.alternate) {
                    assert.equal(result.lloc, 2, 'LLoC must be 2.');
                } else {
                    assert.equal(result.lloc, 1, 'LLoC must be 1.');
                }
                assert.equal(result.cyclomatic, 1, 'Cyclomatic must be 1.');

                // operators
                assert.isArray(result.operators, 'operators must be an array.');
                if (node.alternate) {
                    assert.lengthOf(result.operators, 2, 'operators.length must be 1.');
                    assert.equal(result.operators[0], 'if', 'operators[0] must be if.');
                    assert.equal(result.operators[1], 'else', 'operators[1] must be else.');
                } else {
                    assert.lengthOf(result.operators, 1, 'operators.length must be 1.');
                    assert.equal(result.operators[0], 'if', 'operators[0] must be if.');
                }

                //nextNodes
                assert.isArray(result.nextNodes, 'nextNodes must be an array.');
                assert.lengthOf(result.nextNodes, countNodes, `nextNodes must have ${countNodes} entry/ies`);
                assert.equal(checkNodes(result.nextNodes), true, 'Nodes should be mapped');

                assert.equal(result.newScope, true);

            };

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        let assign = new IfStatement();

        assert.typeOf(IfStatement, 'function');
        assert.instanceOf(assign, IfStatement);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new IfStatement();
            assert.typeOf(assign.processNode, 'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });

        it('should have the right result', () => {
            let assign = new IfStatement();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            let checkAssign = checkNode(assign, 'test', 'consequent', 'alternate', 'else');
            let check = checkAssign(undefined, undefined);
            check(getFixture());
            check = checkAssign({ forIn: false }, undefined);
            check(getFixture2());
        });
    });
});


function getFixture() {
    // http://esprima.org/demo/parse.html?code=for%20(a%20in%20o)%20%7B%0A%0A%7D
    return {
        "type": "IfStatement",
        "test": {
            "type": "Identifier",
            "name": "a"
        },
        "consequent": {
            "type": "BlockStatement",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                    }
                }
            ]
        },
        "alternate": null
    }
}

function getFixture2() {
    // http://esprima.org/demo/parse.html?code=if%20(a)%20%7B%0A%091%3B%0A%7D%20else%20%7B%0A%092%3B%0A%7D%0A
    return {
        "type": "IfStatement",
        "test": {
            "type": "Identifier",
            "name": "a"
        },
        "consequent": {
            "type": "BlockStatement",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                    }
                }
            ]
        },
        "alternate": {
            "type": "BlockStatement",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": 2,
                        "raw": "2"
                    }
                }
            ]
        }
    }
}


