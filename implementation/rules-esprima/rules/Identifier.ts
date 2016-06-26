import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class Identifier extends EsPrimaRule {
    processNode<U>(node:ESTree.Identifier, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 0,
            cyclomatic: 0,
            operands: [Identifier.getPropertyName(node)],
            nextNodes: [],
        }
    }


    static getPropertyName(node: ESTree.Identifier): string {
        if (node.type !== 'Identifier') {
            return;
        }
        return node.name;
    }
}
/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get () {
    return traits.actualise(
        0, 0, undefined,
        function (node) {
            return node.name;
        }
    );
}
*/