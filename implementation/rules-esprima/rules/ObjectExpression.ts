import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class ObjectExpression extends EsPrimaRule {
    processNode<U>(node:ESTree.ObjectExpression, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 0,
            cyclomatic: 0,
            operators: ['{}'],
            operands: [EsPrimaRule.safeName(node)],
            nextNodes: this.getNodesToVisit(node, 'properties')
        }
    }
}

/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get () {
    return traits.actualise(0, 0, '{}', require('../safeName'), 'properties');
}
*/