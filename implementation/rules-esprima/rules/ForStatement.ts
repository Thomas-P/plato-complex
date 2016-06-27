import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";
import {getDeepEntry} from "../../../lib/helper/getDeepEntry";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class ForStatement extends EsPrimaRule {
    processNode<U>(node:ESTree.ForStatement, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        if (!node) {
            return;
        }
        return {
            lloc: 1,
            cyclomatic: getDeepEntry(node, 'test') ? 1: 0,
            operators: ['for'],
            nextNodes: this.getNodesToVisit(node, 'init', 'test', 'update', 'body')
        }
    }
}
/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get () {
    return traits.actualise(
        1,
        function (node) {
            return node.test ? 1 : 0;
        },
        'for', undefined, [ 'init', 'test', 'update', 'body' ]
    );
}
*/