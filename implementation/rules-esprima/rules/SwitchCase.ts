import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class SwitchCase extends EsPrimaRule {
    processNode<U extends { switchCase:boolean }>(node:ESTree.SwitchCase, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 1,
            cyclomatic: settings.switchCase && node.test ? 1 : 0,
            operators: [node.test ? 'case' : 'default'],
            nextNodes: this.getNodesToVisit(node, 'test', 'consequent')
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
 function (node) {
 return settings.switchcase && node.test ? 1 : 0;
 },
 function (node) {
 return node.test ? 'case' : 'default';
 },
 undefined, [ 'test', 'consequent' ]
 );
 }
 */