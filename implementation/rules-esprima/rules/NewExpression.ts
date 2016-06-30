import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class NewExpression extends EsPrimaRule {
    processNode<U>(node:ESTree.NewExpression, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: node.callee.type === 'FunctionExpression' ? 1 : 0,
            cyclomatic: 0,
            operators: ['new'],
            nextNodes: this.getNodesToVisit(node, 'arguments', 'callee')
        }
    }
}
/*
 'use strict';

 var traits = require('../traits');

 exports.get = get;

 function get () {
 return traits.actualise(
 function (node) {
 return node.callee.type === 'FunctionExpression' ? 1 : 0;
 },
 0, 'new', undefined, [ 'arguments', 'callee' ]
 );
 }
 */