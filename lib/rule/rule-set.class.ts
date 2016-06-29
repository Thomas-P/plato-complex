import {IRuleSet} from "../.interfaces/rules/rule-set.interface";
import {IRule} from "../.interfaces/rules/rule.interface";
import {IRuleResult} from "../.interfaces/rules/rule-result.interface";
/**
 * Created by ThomasP on 25.06.2016.
 */


export abstract class RuleSet implements IRuleSet {
    private $ruleStore: Map<string, IRule> = new Map();


    getRule(name:string):IRule {
        return undefined;
    }


    addRule(name:string, rule:IRule):void {
        if (!rule || !name) {
            return;
        }
        this.$ruleStore.set(name, rule);
    }


    removeRule(name:string):boolean {
        return this.$ruleStore.delete(name);
    }


    hasRule(name:string):boolean {
        return this.$ruleStore.has(name);
    }


    abstract processNode<T, U>(node: T, settings: U, assignedName?: string): IRuleResult<T>;
}