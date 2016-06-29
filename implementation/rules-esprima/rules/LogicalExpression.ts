import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";
import {IReportSettings} from "../../../lib/.interfaces/report/report-settings.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class LogicalExpression extends EsPrimaRule {
    processNode<U extends IReportSettings>(node:ESTree.LogicalExpression, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        let isAnd: boolean = node.operator === '&&';
        let isOr: boolean = node.operator === '||';

        return {
            lloc: 0,
            cyclomatic: isAnd || (settings.logicalOr && isOr) ? 1 : 0,
            operators: [node.operator],
            nextNodes: this.getNodesToVisit(node, 'left', 'right')
        }
    }
}
/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get (settings) {
    return traits.actualise(
        0,
        function (node) {
            var isAnd = node.operator === '&&';
            var isOr = node.operator === '||';
            return (isAnd || (settings.logicalor && isOr)) ? 1 : 0;
        },
        function (node) {
            return node.operator;
        },
        undefined, [ 'left', 'right' ]
    );
}
*/