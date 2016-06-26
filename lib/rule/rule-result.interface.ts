/**
 * Created by ThomasP on 25.06.2016.
 */


export interface IRuleResult<T> {
    /**
     *
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
    newScope?:boolean;
    /**
     * Dependencies will be implement later
     */
    dependencies?:any;
    /**
     * give the nodes back that should be visit next.
     * The base class rule have a helper function for this
     */
    nextNodes:Array<T>;
}
