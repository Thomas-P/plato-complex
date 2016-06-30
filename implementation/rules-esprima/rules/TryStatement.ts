import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class TryStatement extends EsPrimaRule {
    processNode<U>(node:ESTree.TryStatement, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 1,
            cyclomatic: 0,
            nextNodes: this.getNodesToVisit(node, 'block', 'handler')
        }
    }
}
/*
 'use strict';

 var traits = require('../traits');

 exports.get = get;

 function get () {
 return traits.actualise(1, 0, undefined, undefined, [ 'block', 'handler' ]);
 }
 */