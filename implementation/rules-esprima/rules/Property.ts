import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class Property extends EsPrimaRule {
    processNode<U>(node:ESTree.Property, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 1,
            cyclomatic: 0,
            operators: [':'],
            nextNodes: this.getNodesToVisit(node, 'key', 'value'),
            assignableName: EsPrimaRule.safeName(node.key),
        }
    }
}
/*
'use strict';

var traits = require('../traits'),
    safeName = require('../safeName');

exports.get = get;

function get () {
    return traits.actualise(
        1, 0, ':', undefined, [ 'key', 'value' ],
        function (node) {
            return safeName(node.key);
        }
    );
}
*/