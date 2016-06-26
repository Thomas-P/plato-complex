import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class IfStatement extends EsPrimaRule {
    processNode<U>(node:ESTree.IfStatement, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        let result:IRuleResult<ESTree.Node> = {
            lloc: node.alternate ? 2 : 1,
            cyclomatic: 1,
            operators: ['if'],
            nextNodes: this.getNodesToVisit(node, 'test', 'consequent', 'alternate'),
        };
        if (node.alternate) {
            result.operators.push('else');
        }
        return result;
    }


}
/**


 var traits = require('../traits');

 exports.get = get;

 function get () {
    return traits.actualise(
        function (node) {
            return node.alternate ? 2 : 1;
        },
        1,
        [
            'if',
            {
                identifier: 'else',
                filter: function (node) {
                    return !!node.alternate;
                }
            }
        ],
        undefined, [ 'test', 'consequent', 'alternate' ]
    );
}
*/