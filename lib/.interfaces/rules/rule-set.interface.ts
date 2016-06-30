import {IRule} from "./rule.interface";
import {IRuleResult} from "./rule-result.interface";
/**
 * Created by ThomasP on 25.06.2016.
 */


/**
 * Interface for the command pattern implemented as an rule set
 */
export interface IRuleSet {
    /**
     * get a rule object from a specified name
     * @param name
     */
    getRule(name: string): IRule;
    /**
     * add a new rule to the rule set
     * @param name
     * @param rule
     */
    addRule(name: string, rule: IRule): void;
    /**
     * remove a rule from a rule set
     * @param name
     */
    removeRule(name: string): boolean;
    /**
     * check if a specified rule Exists
     * @param name
     */
    hasRule(name: string): boolean;
    /**
     * process a node by the settings and the rules given before
     * @param node
     * @param settings
     * @param assignedName
     */
    processNode<T, U>(node: T, settings: U, assignedName?: string): IRuleResult<T>;
}