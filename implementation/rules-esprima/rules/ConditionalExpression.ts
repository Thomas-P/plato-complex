import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class ConditionalExpression extends EsPrimaRule {
    processNode<U>(node:ESTree.ConditionalExpression, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        if (!node) {
            return;
        }
        return {
            lloc: 0,
            cyclomatic: 1,
            operators: [':?'],
            nextNodes: this.getNodesToVisit(node, 'test', 'consequent', 'alternate')
        }
    }
}
/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get () {
    return traits.actualise(0, 1, ':?', undefined, [ 'test', 'consequent', 'alternate' ]);
}
*/