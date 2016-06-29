import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class UnaryExpression extends EsPrimaRule {
    processNode<U>(node:ESTree.UnaryExpression, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        let name = `${node.operator}(${node.prefix ? 'pre' : 'post'}fix)`;
        return {
            lloc: 0,
            cyclomatic: 0,
            operators: [name],
            nextNodes: this.getNodesToVisit(node, 'argument')
        }
    }
}
/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get () {
    return traits.actualise(
        0, 0,
        function (node) {
            return node.operator + ' (' + (node.prefix ? 'pre' : 'post') + 'fix)';
        },
        undefined, [ 'argument' ]
    );
}
*/