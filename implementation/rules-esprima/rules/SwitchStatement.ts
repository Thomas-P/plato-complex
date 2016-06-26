import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class SwitchStatement extends EsPrimaRule {
    processNode<U>(node:ESTree.SwitchStatement, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 1,
            cyclomatic: 0,
            operators: ['switch'],
            nextNodes: this.getNodesToVisit(node, 'discriminant', 'cases')
        }
    }
}
/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get () {
    return traits.actualise(1, 0, 'switch', undefined, [ 'discriminant', 'cases' ]);
}
*/