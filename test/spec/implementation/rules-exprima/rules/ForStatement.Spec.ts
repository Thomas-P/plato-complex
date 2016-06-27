import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRuleResult} from "../../../../../lib/rule/rule-result.interface";
import {IRule} from "../../../../../lib/rule/rule.interface";
import {settings} from "cluster";
import {ForStatement} from "../../../../../implementation/rules-esprima/rules/ForStatement";
import {getDeepEntry} from "../../../../../lib/helper/getDeepEntry";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 27.06.2016.
 */



describe('class ForStatement', () => {

    let checkNode = (iRule:IRule, ...nodeNames:Array<string>) =>
        (settings, assignedName) =>
            (node:ESTree.ForStatement) => {
                // every name have some entries
                let checkNodes = (nodeResult:Array<any>) =>
                    nodeNames
                        .every((name) => nodeResult.some((rNode) => deepEqual(rNode, node[name])))

                let result = iRule.processNode(node, settings, assignedName);

                assert.isObject(result, 'result must be an object');
                assert.isNotNull(result, null, 'result must be not null');
                // standard
                assert.equal(result.lloc, 1, 'LLoC must be 1.');
                assert.equal(result.cyclomatic, getDeepEntry(node, 'test') ? 1: 0, 'Cyclomatic must be 0/1.');
                // operators
                assert.isArray(result.operators, 'operators must be an array.');
                assert.lengthOf(result.operators, 1, 'operators.length must be 1.');
                assert.equal(result.operators[0], 'for', 'operators[0] must be for.');

                //nextNodes
                assert.isArray(result.nextNodes, 'nextNodes must be an array.');
                assert.lengthOf(result.nextNodes, 4, 'nextNodes must have one entry/ies');
                assert.equal(checkNodes(result.nextNodes), true, 'Nodes should be mapped');

            };

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        let assign = new ForStatement();

        assert.typeOf(ForStatement, 'function');
        assert.instanceOf(assign, ForStatement);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new ForStatement();
            assert.typeOf(assign.processNode, 'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });

        it('should have the right result', () => {
            let assign = new ForStatement();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            let checkAssign = checkNode(assign,  'init', 'test', 'update', 'body');
            let check = checkAssign(undefined, undefined);
            check(getFixture());
        });
    });
});


function getFixture() {
    // http://esprima.org/demo/parse.html?code=for%20(true%3Bfalse%3Ba%2B%2B)%20%7B%0A%0A%7D
    return {
        "type": "ForStatement",
        "init": {
            "type": "Literal",
            "value": true,
            "raw": "true"
        },
        "test": {
            "type": "Literal",
            "value": false,
            "raw": "false"
        },
        "update": {
            "type": "UpdateExpression",
            "operator": "++",
            "argument": {
                "type": "Identifier",
                "name": "a"
            },
            "prefix": false
        },
        "body": {
            "type": "BlockStatement",
            "body": []
        }
    }
}
