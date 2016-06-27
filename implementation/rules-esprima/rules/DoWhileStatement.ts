import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";
import {getDeepEntry} from "../../../lib/helper/getDeepEntry";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class DoWhileStatement extends EsPrimaRule {
    processNode<U>(node:ESTree.DoWhileStatement, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        if (!node) {
            return;
        }
        return {
            lloc: 2,
            cyclomatic: getDeepEntry(node, 'test') ? 1: 0,
            operators: ['doWhile'],
            nextNodes: this.getNodesToVisit(node, 'test', 'body')
        }
    }
}
/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get () {
    return traits.actualise(
        2,
        function (node) {
            return node.test ? 1 : 0;
        },
        'dowhile', undefined, [ 'test', 'body' ]
    );
}
*/