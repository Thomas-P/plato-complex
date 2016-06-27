import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";
import {getLiteralExpressionNameHelper} from "../core/propertyNameHelper";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class Literal extends EsPrimaRule {
    processNode<U>(node:ESTree.Literal, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 0,
            cyclomatic: 0,
            operands: [Literal.getPropertyName(node)],
            nextNodes: []
        }
    }
    /**
     * return the property name of a literal
     * @param node
     * @returns {string}
     */
    static getPropertyName = getLiteralExpressionNameHelper;

}

/*
'use strict';

var traits = require('../traits'),
    check = require('check-types');

exports.get = get;

function get () {
    return traits.actualise(
        0, 0, undefined,
        function (node) {
            if (check.string(node.value)) {
                // Avoid conflicts between string literals and identifiers.
                return '"' + node.value + '"';
            }

            return node.value;
        }
    );
}
*/