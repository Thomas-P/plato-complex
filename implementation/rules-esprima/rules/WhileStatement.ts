import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class WhileStatement extends EsPrimaRule {
    processNode<U>(node:ESTree.WhileStatement, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 1,
            cyclomatic: node.test ? 1 : 0,
            operators: ['while'],
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
        1,
        function (node) {
            return node.test ? 1 : 0;
        },
        'while', undefined, [ 'test', 'body' ]
    );
}
*/