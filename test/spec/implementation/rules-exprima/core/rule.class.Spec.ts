import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRuleResult} from "../../../../../lib/.interfaces/rules/rule-result.interface";
const assert = require('chai').assert;
/**
 * Created by ThomasP on 26.06.2016.
 */
// http://esprima.org/demo/parse.html?code=%2F%2F%20Life%2C%20Universe%2C%20and%20Everything%0Avar%20answer%20%3D%206%20*%207%3B%0Aa.b.c%20%3D%20c.a.b%3B%0A
let node:any = {
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "answer"
                    },
                    "init": {
                        "type": "BinaryExpression",
                        "operator": "*",
                        "left": {
                            "type": "Literal",
                            "value": 6,
                            "raw": "6"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 7,
                            "raw": "7"
                        }
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
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
                    "property": {
                        "type": "Identifier",
                        "name": "c"
                    }
                },
                "right": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "MemberExpression",
                        "computed": false,
                        "object": {
                            "type": "Identifier",
                            "name": "c"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "b"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
};


describe('class EsPrimaRule', () => {
    /**
     * create a class that allow to test implementation
     */
    class TestClass extends EsPrimaRule {
        processNode<U>(node:ESTree.Node, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
            return undefined;
        }
    }

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        assert.typeOf(EsPrimaRule, 'function');

    });

    /**
     * test of static .helper method
     * @method getPropertyNameHelper
     */
    describe('#getPropertyNameHelper(node)', () => {
        it('should have the correct interface', () => {
            assert.typeOf(EsPrimaRule.getPropertyNameHelper, 'function');
            assert.equal(EsPrimaRule.getPropertyNameHelper.length, 1);
        });
    });


    describe('#safeName(object, defaultName)', () => {


        it('should have the correct interface', () => {
            // save name has two parameter
            assert.typeOf(EsPrimaRule.safeName, 'function');
            assert.equal(EsPrimaRule.safeName.length, 2);
        });


        it('schould give the correct result', () => {
            assert.equal(EsPrimaRule.safeName(undefined, undefined), '<anonymous>');
            assert.equal(EsPrimaRule.safeName(undefined, '<default>'), '<default>');
            assert.equal(EsPrimaRule.safeName({}, '<default>'), '<default>');
            assert.equal(EsPrimaRule.safeName({}, undefined), '<anonymous>');
            assert.equal(EsPrimaRule.safeName({name: 'test'}, undefined), 'test');
            assert.equal(EsPrimaRule.safeName({name: 'test'}, '<default>'), 'test');
            assert.equal(EsPrimaRule.safeName('Hallo', undefined), 'Hallo');
            assert.equal(EsPrimaRule.safeName('Hallo', 'Welt'), 'Hallo');
        });
    });

    describe('#getNodesToVisit(node, [names])', () => {
        let test = new TestClass();
        it('should have the correct interface', () => {
            // save name has two parameter
            assert.typeOf(test['getNodesToVisit'], 'function');
            assert.equal(test['getNodesToVisit'].length, 1);
        });

        it('should give the right nodes back', () => {
            let result = test['getNodesToVisit'](undefined);
            assert.isArray(result, 'should be an array');
            assert.lengthOf(result, 0, 'should have 0 entries');

            result = test['getNodesToVisit'](node);
            assert.isArray(result, 'should be an array');
            assert.lengthOf(result, 0, 'should have 0 entries');

            result = test['getNodesToVisit'](node, 'body');
            assert.isArray(result, 'should be an array');
            assert.lengthOf(result, 1, 'should have 1 entry');

            let body = result[0];
            assert.isArray(body, 'body be an array');
            assert.lengthOf(body, 2, 'body should have 1 entry');

            assert.deepEqual(body, node.body, 'node.body should equal with given body');

            let expression = node.body[1].expression;

            result = test['getNodesToVisit'](expression, 'left', 'right');
            assert.isArray(result, 'should be an array');
            assert.lengthOf(result, 2, 'should have 2 entries');

            assert.deepEqual(expression.left, result[0], 'expression.left should equal with given expression -> left');
            assert.deepEqual(expression.right, result[1], 'expression.right should equal with given expression -> right');

        });
    });
});