import {EsPrimaRule} from "../core/rule.class";
import {IRuleResult} from "../../../lib/.interfaces/rules/rule-result.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */


export class BlockStatement extends EsPrimaRule {
    processNode<U>(node:ESTree.BlockStatement, settings:U, assignedName?:string):IRuleResult<ESTree.Node> {
        if (!node) {
            return;
        }
        return {
            lloc: 0,
            cyclomatic: 0,
            nextNodes: this.getNodesToVisit(node, 'body')
        }
    }
}

/*
'use strict';

var traits = require('../traits');

exports.get = get;

function get() {
    return traits.actualise(0, 0, undefined, undefined, 'body');
}
    */