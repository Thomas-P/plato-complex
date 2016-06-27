import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";
import {getDeepEntry} from "../../../lib/helper/getDeepEntry";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class ForInStatement extends EsPrimaRule {
    processNode<U extends { forIn: boolean }>(node:ESTree.ForInStatement, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        if (!node) {
            return;
        }
        return {
            lloc: 1,
            cyclomatic: getDeepEntry(settings, 'forIn') ?  1 : 0,
            operators: ['forIn'],
            nextNodes: this.getNodesToVisit(node, 'left', 'right', 'body')
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
        function () {
            return settings.forin ? 1 : 0;
        },
        'forin', undefined, [ 'left', 'right', 'body' ]
    );
}
*/