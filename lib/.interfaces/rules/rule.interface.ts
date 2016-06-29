import {IRuleResult} from "./rule-result.interface";
/**
 * Created by ThomasP on 22.06.2016.
 * @author Thomas-P
 */
export interface IRule {
    processNode<T, U>(node: T, settings: U, assignedName?: string): IRuleResult<T>;
}