import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";
import {getIdentifierExpressionNameHelper} from "../core/propertyNameHelper";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class Identifier extends EsPrimaRule {
    processNode<U>(node:ESTree.Identifier, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        if (!node) {
            return;
        }
        return {
            lloc: 0,
            cyclomatic: 0,
            operands: [Identifier.getPropertyName(node)],
            nextNodes: [],
        }
    }


    static getPropertyName = getIdentifierExpressionNameHelper;
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