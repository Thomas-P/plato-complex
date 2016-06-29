import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";
import {getDeepEntry} from "../../../lib/.helper/getDeepEntry";
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
        let start: number = Number(getDeepEntry(node, 'loc', 'start', 'line'));
        let end: number = Number(getDeepEntry(node, 'loc', 'end', 'line'));
        let paramCount: number = Number(getDeepEntry(node, 'params', 'length'));
        return {
            lloc: 0,
            cyclomatic: 0,
            operators: ['function'],
            operands: [EsPrimaRule.safeName(name)],
            newScope: {
                name: EsPrimaRule.safeName(name, assignedName),
                start: start,
                length: end-start+1,
                paramCount: paramCount,
            },
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