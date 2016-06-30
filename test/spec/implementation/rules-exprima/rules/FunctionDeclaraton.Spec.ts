import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRuleResult} from "../../../../../lib/.interfaces/rules/rule-result.interface";
import {IRule} from "../../../../../lib/.interfaces/rules/rule.interface";
import {settings} from "cluster";
import {FunctionDeclaration} from "../../../../../implementation/rules-esprima/rules/FunctionDeclaration";
import {getDeepEntry} from "../../../../../lib/.helper/getDeepEntry";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 27.06.2016.
 */



describe('class FunctionDeclaration', () => {

    let checkNode = (iRule:IRule, ...nodeNames:Array<string>) =>
        (settings, assignedName) =>
            (node:ESTree.FunctionDeclaration) => {
                // every name have some entries
                let checkNodes = (nodeResult:Array<any>) =>
                    nodeNames
                        .every((name) => nodeResult.some((rNode) => deepEqual(rNode, node[name])))

                let result = iRule.processNode(node, settings, assignedName);

                assert.isObject(result, 'result must be an object');
                assert.isNotNull(result, null, 'result must be not null');
                // standard
                assert.equal(result.lloc, 1, 'LLoC must be 1.');
                assert.equal(result.cyclomatic, 0, 'Cyclomatic must be 0.');
                // operators
                assert.isArray(result.operators, 'operators must be an array.');
                assert.lengthOf(result.operators, 1, 'operators.length must be 1.');
                assert.equal(result.operators[0], 'function', 'operators[0] must be function.');

                // operands
                assert.isArray(result.operands, 'operands must be an array.');
                assert.lengthOf(result.operands, 1, 'operands.length must be 1.');
                assert.equal(result.operands[0], 'a', 'operands[0] must be a.');

                //nextNodes
                assert.isArray(result.nextNodes, 'nextNodes must be an array.');
                assert.lengthOf(result.nextNodes, 2, 'nextNodes must have one entry/ies');
                assert.equal(checkNodes(result.nextNodes), true, 'Nodes should be mapped');

                //assert.equal(result.newScope, true);
                // @todo Assert new Scope

            };

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        let assign = new FunctionDeclaration();

        assert.typeOf(FunctionDeclaration, 'function');
        assert.instanceOf(assign, FunctionDeclaration);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static .helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new FunctionDeclaration();
            assert.typeOf(assign.processNode, 'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });

        it('should have the right result', () => {
            let assign = new FunctionDeclaration();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            let checkAssign = checkNode(assign, 'params', 'body');
            let check = checkAssign(undefined, undefined);
            check(getFixture());
            check = checkAssign({ forIn: false }, undefined);
            check(getFixture());
            check = checkAssign({ forIn: true }, undefined);
            check(getFixture());
        });
    });
});


function getFixture() {
    // http://esprima.org/demo/parse.html?code=for%20(a%20in%20o)%20%7B%0A%0A%7D
    return {
        "type": "FunctionDeclaration",
        "id": {
            "type": "Identifier",
            "name": "a"
        },
        "params": [],
        "defaults": [],
        "body": {
            "type": "BlockStatement",
            "body": []
        },
        "generator": false,
        "expression": false
    }
}
