import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRule} from "../../../../../lib/.interfaces/rules/rule.interface";
import {CatchClause} from "../../../../../implementation/rules-esprima/rules/CatchClause";
import {getDeepEntry} from "../../../../../lib/.helper/getDeepEntry";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 27.06.2016.
 */



describe('class CatchClause', () => {

    let checkNode = (iRule:IRule, ...nodeNames:Array<string>) =>
        (settings, assignedName) =>
            (node:ESTree.CatchClause) => {
                // every name have some entries
                let checkNodes = (nodeResult:Array<any>) =>
                    nodeNames
                        .every((name) => nodeResult.some((rNode) => deepEqual(rNode, node[name])))

                let result = iRule.processNode(node, settings, assignedName);

                assert.isObject(result, 'result must be an object');
                assert.isNotNull(result, null, 'result must be not null');
                // standard
                assert.equal(result.lloc, 1, 'LLoC must be 1.');
                if (getDeepEntry(settings, 'tryCatch')) {
                    assert.equal(result.cyclomatic, 1, 'Cyclomatic must be 1.');
                } else {
                    assert.equal(result.cyclomatic, 0, 'Cyclomatic must be 0.');

                }
                // operators
                assert.isArray(result.operators, 'operators must be an array.');
                assert.lengthOf(result.operators, 1, 'operators.length must be 1.');
                assert.equal(result.operators[0], 'catch', 'operators[0] must be catch.');

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
        let assign = new CatchClause();

        assert.typeOf(CatchClause, 'function');
        assert.instanceOf(assign, CatchClause);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static .helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new CatchClause();
            assert.typeOf(assign.processNode, 'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });

        it('should have the right result', () => {
            let assign = new CatchClause();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            let checkAssign = checkNode(assign, 'param', 'body');
            let check = checkAssign(undefined, undefined);
            check(getFixture());

            check = checkAssign({tryCatch: true}, undefined);
            check(getFixture());
            check = checkAssign({tryCatch: false}, undefined);
            check(getFixture());
        });
    });
});

/*
 function getFixture() {
 // http://esprima.org/demo/parse.html?code=while(true)%20%7B%0A%09break%3B%09%0A%7D%0A
 return {
 "type": "CatchClause",
 "callee": {
 "type": "Identifier",
 "name": "test"
 },
 "arguments": []
 }
 }
 */
function getFixture() {
    // http://esprima.org/demo/parse.html?code=try%20%7B%7D%20catch%20(e)%20%7B%20%7D
    return {
        "type": "CatchClause",
        "param": {
            "type": "Identifier",
            "name": "e"
        },
        "body": {
            "type": "BlockStatement",
            "body": []
        }
    }
}