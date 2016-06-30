import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRule} from "../../../../../lib/.interfaces/rules/rule.interface";
import {ForInStatement} from "../../../../../implementation/rules-esprima/rules/ForInStatement";
import {getDeepEntry} from "../../../../../lib/.helper/getDeepEntry";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 27.06.2016.
 */



describe('class ForInStatement', () => {

    let checkNode = (iRule:IRule, ...nodeNames:Array<string>) =>
        (settings, assignedName) =>
            (node:ESTree.ForInStatement) => {
                // every name have some entries
                let checkNodes = (nodeResult:Array<any>) =>
                    nodeNames
                        .every((name) => nodeResult.some((rNode) => deepEqual(rNode, node[name])))

                let result = iRule.processNode(node, settings, assignedName);

                assert.isObject(result, 'result must be an object');
                assert.isNotNull(result, null, 'result must be not null');
                // standard
                assert.equal(result.lloc, 1, 'LLoC must be 1.');
                assert.equal(result.cyclomatic, getDeepEntry(settings, 'forIn') ? 1 : 0, 'Cyclomatic must be 0/1.');
                // operators
                assert.isArray(result.operators, 'operators must be an array.');
                assert.lengthOf(result.operators, 1, 'operators.length must be 1.');
                assert.equal(result.operators[0], 'forIn', 'operators[0] must be forIn.');

                //nextNodes
                assert.isArray(result.nextNodes, 'nextNodes must be an array.');
                assert.lengthOf(result.nextNodes, 3, 'nextNodes must have one entry/ies');
                assert.equal(checkNodes(result.nextNodes), true, 'Nodes should be mapped');

            };

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        let assign = new ForInStatement();

        assert.typeOf(ForInStatement, 'function');
        assert.instanceOf(assign, ForInStatement);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static .helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new ForInStatement();
            assert.typeOf(assign.processNode, 'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });

        it('should have the right result', () => {
            let assign = new ForInStatement();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            let checkAssign = checkNode(assign, 'left', 'right', 'body');
            let check = checkAssign(undefined, undefined);
            check(getFixture());
            check = checkAssign({forIn: false}, undefined);
            check(getFixture());
            check = checkAssign({forIn: true}, undefined);
            check(getFixture());
        });
    });
});


function getFixture() {
    // http://esprima.org/demo/parse.html?code=for%20(a%20in%20o)%20%7B%0A%0A%7D
    return {
        "type": "ForInStatement",
        "left": {
            "type": "Identifier",
            "name": "a"
        },
        "right": {
            "type": "Identifier",
            "name": "o"
        },
        "body": {
            "type": "BlockStatement",
            "body": []
        },
        "each": false
    }
}
