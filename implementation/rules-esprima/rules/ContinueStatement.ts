import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class ContinueStatement extends EsPrimaRule {
    processNode<U>(node:ESTree.ContinueStatement, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        if (!node) {
            return;
        }
        return {
            lloc: 1,
            cyclomatic: 0,
            operators: ['continue'],
            nextNodes: this.getNodesToVisit(node, 'label')
        }
    }
}

/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get () {
    return traits.actualise(1, 0, 'continue', undefined, [ 'label' ]);
}
*/