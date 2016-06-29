import {EsPrimaRule} from "../../../../../implementation/rules-esprima/core/rule.class";
import {IRuleResult} from "../../../../../lib/.interfaces/rules/rule-result.interface";
import {IRule} from "../../../../../lib/.interfaces/rules/rule.interface";
import {settings} from "cluster";
import {ContinueStatement} from "../../../../../implementation/rules-esprima/rules/ContinueStatement";
import {getDeepEntry} from "../../../../../lib/.helper/getDeepEntry";
let assert = require('chai').assert;
let deepEqual = require('deep-equal');
/**
 * Created by ThomasP on 27.06.2016.
 */



describe('class ContinueStatement', () => {

    let checkNode = (iRule:IRule, ...nodeNames:Array<string>) =>
        (settings, assignedName) =>
            (node:ESTree.ContinueStatement) => {
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
                assert.equal(result.operators[0], 'continue', 'operators[0] must be continue.');

                //nextNodes
                assert.isArray(result.nextNodes, 'nextNodes must be an array.');
                if (node.label) {
                    assert.lengthOf(result.nextNodes, 1, 'nextNodes must have one entry/ies');
                    assert.equal(checkNodes(result.nextNodes), true, 'Nodes should be mapped');
                } else {
                    assert.lengthOf(result.nextNodes, 0, 'nextNodes must have zero entry/ies');
                }

            };

    /**
     * Main class
     * @class EsPrimaRule
     */
    it('should have the correct interface', () => {
        let assign = new ContinueStatement();

        assert.typeOf(ContinueStatement, 'function');
        assert.instanceOf(assign, ContinueStatement);
        assert.instanceOf(assign, EsPrimaRule);

    });

    /**
     * test of static .helper method
     * @method processNode
     */
    describe('#processNode(node, settings, assigned name)', () => {
        it('should have the correct interface', () => {
            let assign = new ContinueStatement();
            assert.typeOf(assign.processNode, 'function', 'must be a function');
            assert.equal(assign.processNode.length, 3, '3 Args');
        });

        it('should have the right result', () => {
            let assign = new ContinueStatement();
            let result = assign.processNode(undefined, undefined, undefined);
            assert.isUndefined(result, 'No node -> undefined result.');
            let checkAssign = checkNode(assign, 'label');
            let check = checkAssign(undefined, undefined);
            check(getFixture2());
            check(getFixture());
        });
    });
});


function getFixture() {
    // http://esprima.org/demo/parse.html?code=while(true)%20%7B%0A%09continue%3B%0A%7D
    return {
        "type": "ContinueStatement",
        "label": {
            type: "Identifier",
            name: "test",
        }
    }
}

function getFixture2() {
    // http://esprima.org/demo/parse.html?code=while(true)%20%7B%0A%09continue%3B%0A%7D
    return {
        "type": "ContinueStatement",
        "label": null
    }
}