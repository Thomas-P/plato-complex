import {RuleSet} from "../../../lib/rule/rule-set.class";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";
import {IRule} from "../../../lib/rule/rule.interface";
/**
 * Created by ThomasP on 25.06.2016.
 */


export class EsPrimaRuleSet extends RuleSet {
    /**
     * Rule implementation for ES Prima
     * @param node
     * @param settings
     * @param assignedName
     * @returns {IRuleResult<ESTree.Node>}
     */
    processNode<U>(node: ESTree.Node, settings:U, assignedName?:string):IRuleResult {
        // no rule
        if (!node || this.hasRule(node.type) === false) {
            return;
        }
        let rule: IRule = this.getRule(node.type);
        return rule.processNode(node, settings, assignedName);
    }
}