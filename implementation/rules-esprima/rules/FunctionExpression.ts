import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";
import {getDeepEntry} from "../../../lib/helper/getDeepEntry";
import {getPropertyNameHelper} from "../core/propertyNameHelper";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class FunctionExpression extends EsPrimaRule {
    processNode<U>(node:ESTree.FunctionExpression, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        if (!node) {
            return;
        }
        let name = getPropertyNameHelper(<ESTree.Node>getDeepEntry(node, 'id'));
        return {
            lloc: 0,
            cyclomatic: 0,
            operators: ['function'],
            operands: [EsPrimaRule.safeName(name)],
            newScope: true,
            nextNodes: this.getNodesToVisit(node, 'params', 'body')
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
        0, 0, 'function',
        function (node) {
            return safeName(node.id);
        },
        [ 'params', 'body' ], undefined, true
    );
}
*/