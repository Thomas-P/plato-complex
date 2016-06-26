import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class SequenceExpression extends EsPrimaRule {
    processNode<U>(node:ESTree.SequenceExpression, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 0,
            cyclomatic: 0,
            nextNodes: this.getNodesToVisit(node, 'expressions')
        }
    }
}
/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get () {
    return traits.actualise(0, 0, undefined, undefined, 'expressions');
}
*/