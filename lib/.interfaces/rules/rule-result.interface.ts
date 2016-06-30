import {IReportDependencies} from "../report/report.interface";
/**
 * Created by ThomasP on 25.06.2016.
 */


/**
 * Scope with information for new function scopes
 */
export interface IRuleResultScope {
    name:string;
    start:number;
    length:number;
    paramCount:number;
}


export interface IRuleResult<T> {
    /**
     * logical complexity
     * @todo ask why lloc
     */
    lloc:number;
    /**
     * cyclomatic complexity
     */
    cyclomatic:number;
    /**
     * list of operator names
     */
    operators?:Array<string>;
    /**
     * list of operands
     */
    operands?:Array<string>;
    /**
     * the assignable name
     */
    assignableName?:string;
    /**
     * should a new scope created
     */
    newScope?:IRuleResultScope;
    /**
     * Dependencies will be implement later
     */
    dependencies?:[IReportDependencies];
    /**
     * give the nodes back that should be visit next.
     * The base class rule have a helper function for this
     */
    nextNodes:Array<T>;
}
