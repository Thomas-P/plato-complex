import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";
/**
 * Created by ThomasP on 22.06.2016.
 */


export class AssignmentExpression extends EsPrimaRule {

    processNode<U>(node:ESTree.AssignmentExpression, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        if (!node) {
            return;
        }
        return {
            lloc: 0,
            cyclomatic: 0,
            operators: [node.operator],
            nextNodes: this.getNodesToVisit(node, 'left', 'right'),
            assignableName: EsPrimaRule.getPropertyNameHelper(node.left)
        };
    }

}

/*
 var traits = require('../traits'),
 safeName = require('../safeName');

 exports.get = get;

 function get () {
 return traits.actualise(
 0, 0,
 function (node) {
 return node.operator;
 },
 undefined, [ 'left', 'right' ],
 function (node) {
 if (node.left.type === 'MemberExpression') {
 return safeName(node.left.object) + '.' + node.left.property.name;
 }

 return safeName(node.left.id);
 }
 );
 }
 */