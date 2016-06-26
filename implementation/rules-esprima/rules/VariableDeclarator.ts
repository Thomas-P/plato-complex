import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class VariableDeclarator extends EsPrimaRule {
    processNode<U>(node:ESTree.VariableDeclarator, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 1,
            cyclomatic: 0,
            operators: node.init ? ['='] : undefined,
            nextNodes: this.getNodesToVisit(node, 'id', 'init'),
            assignableName: EsPrimaRule.safeName(node.id),
        }
    }
}
/*
'use strict';

var traits = require('../traits'),
    safeName = require('../safeName');

exports.get = get;

function get () {
    return traits.actualise(
        1, 0,
        {
            identifier: '=',
            filter: function (node) {
                return !!node.init;
            }
        },
        undefined, [ 'id', 'init' ],
        function (node) {
            return safeName(node.id);
        }
    );
}
*/
