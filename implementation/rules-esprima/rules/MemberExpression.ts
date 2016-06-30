import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";
import {getMemberExpressionNameHelper} from "../core/propertyNameHelper";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class MemberExpression extends EsPrimaRule {
    processNode<U>(node:ESTree.MemberExpression, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: [
                'ObjectExpression',
                'ArrayExpression',
                'FunctionExpression'
            ].indexOf(node.object.type) === -1 ? 0 : 1,
            cyclomatic: 0,
            operators: ['.'],
            nextNodes: this.getNodesToVisit(node, 'object', 'property')
        }
    }


    /**
     * compute the property name from a Member Expression node
     * @param node
     * @returns {undefined}
     */
    static getPropertyName = getMemberExpressionNameHelper;
}
/*
 'use strict';

 var traits = require('../traits');

 exports.get = get;

 function get () {
 return traits.actualise(
 function (node) {
 return [
 'ObjectExpression',
 'ArrayExpression',
 'FunctionExpression'
 ].indexOf(node.object.type) === -1 ? 0 : 1;
 },
 0, '.', undefined, [ 'object', 'property' ]
 );
 }
 */