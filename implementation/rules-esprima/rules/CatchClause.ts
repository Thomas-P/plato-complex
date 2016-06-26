import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class CatchClause extends EsPrimaRule {
    processNode<U extends { tryCatch: boolean }>(node:ESTree.CatchClause, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 1,
            cyclomatic: settings && settings.tryCatch ? 1: 0,
            operators: ['catch'],
            nextNodes: this.getNodesToVisit(node, 'param', 'body')
        }
    }
}

/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get (settings) {
    return traits.actualise(
        1,
        function () {
            return settings.trycatch ? 1 : 0;
        },
        'catch', undefined, [ 'param', 'body' ]
    );
}
*/