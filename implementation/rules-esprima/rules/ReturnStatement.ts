import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class ReturnStatement extends EsPrimaRule {
    processNode<U>(node:ESTree.ReturnStatement, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        return {
            lloc: 1,
            cyclomatic: 0,
            operators: ['return'],
            nextNodes: this.getNodesToVisit(node, 'argument')
        }
    }
}

/*
 'use strict';

 var traits = require('../traits');

 exports.get = get;

 function get () {
 return traits.actualise(1, 0, 'return', undefined, [ 'argument' ]);
 }
 */