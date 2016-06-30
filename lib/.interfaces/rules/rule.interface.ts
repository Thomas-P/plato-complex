import {IRuleResult} from "./rule-result.interface";
/**
 * Created by ThomasP on 22.06.2016.
 * @author Thomas-P
 */

/***
 * Process a specific rule
 * It is now implemented as an non async operation and allow to build the command pattern
 * the rules implement the strategy pattern by defining the result an so the next step for the walker
 */
export interface IRule {
    processNode<T, U>(node:T, settings:U, assignedName?:string):IRuleResult<T>;
}