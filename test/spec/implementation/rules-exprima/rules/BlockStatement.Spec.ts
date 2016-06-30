import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRuleResult} from "../../../../../lib/.interfaces/rules/rule-result.interface";
import {BlockStatement} from "../../../../../implementation/rules-esprima/rules/BlockStatement";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 27.06.2016.
 */

describe('class BlockStatement', () => {

    let checkResult = (node:ESTree.BlockStatement, result:IRuleResult<ESTree.Node>) => {
        // every name have some entries
        let checkNodes = (nodeResult:Array<any>, ...nodeNames:Array<string>) =>
            nodeNames
                .every((name) => nodeResult.some((rNode) => deepEqual(rNode, node[name])))


        assert.isObject(result, 'result must be an object');
        assert.isNotNull(result, null, 'result must be not null');
        // standard
        assert.equal(result.lloc, 0, 'LLoC must be 0.');
        assert.equal(result.cyclomatic, 0, 'Cyclomatic must be 0.');

        //nextNodes
        assert.isArray(result.nextNodes, 'nextNodes must be an array.');
        assert.lengthOf(result.nextNodes, 1, 'nextNodes must have two entries');

        assert.equal(checkNodes(result.nextNodes, 'body'), true, 'Nodes should be mapped');

    };

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        let assign = new BlockStatement();

        assert.typeOf(BlockStatement, 'function');
        assert.instanceOf(assign, BlockStatement);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static .helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new BlockStatement();
            assert.typeOf(assign.processNode, 'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });

        it('should have the right result', () => {
            let assign = new BlockStatement();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            result = assign.processNode(getFixture(), undefined);
            checkResult(getFixture(), result);
        });
    });
});


function getFixture() {
    // http://esprima.org/demo/parse.html?code=function%20a()%20%7B%0A%09var%20x%3B%0A%0A%7D
    return {
        "type": "BlockStatement",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "init": null
                    }
                ],
                "kind": "var"
            }
        ]
    }
}