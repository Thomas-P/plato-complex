import Observable = Rx.Observable;
import {IRuleResult} from "../rule/rule-result.interface";
import {IRuleSet} from "../rule/rule-set.interface";
/**
 * Created by ThomasP on 22.06.2016.
 */
export enum WalkerCommand {
    visitNode, leaveNode, addDependency
}

export interface IWalkerCommand<T> {
    cmd: WalkerCommand;
    data: string|IRuleResult<T>;
}


/**
 * The Walker is an iterator over an deep nested object, that takes rules,
 * which say how the walker should look over the object. The implementation
 * is nearly generic and allows also to do async stuff. The return is an
 * observer that push messages, that could used to define the return of
 *
 * In this walker we implement a command pattern, combined with an observer pattern
 * that allows to do asynchronous stuff. The builder, which uses the walker has
 * to implement a stack or a linked list to rebuild the
 * The walker is not able to visit other files, because we want to decouple visiting
 * files from walk through a node tree. File visiting could be defined in a rule or
 * as a command.
 */
export interface IWalker {
    /**
     * The walker takes a ESTree.Program node and walk through all the sub nodes,
     * if a rule declares it
     *
     * Visiting a sub node will be declared by each rule class.
     * We implement all Rules as a command pattern.
     * A rule key is a node type and if a rule for a type exists it will be visited.
     *
     * Instead of an array we get an observable back. This allows us to also walk
     * async in an array and get one command back instead of three callbacks. So
     * we able to implement visiting other programs in the future and take more
     * information about a whole module.
     *
     * @param program
     * @return Observable<IWalkerCommand>
     */
    walk<T, U>(program: T): Observable<IWalkerCommand<U>>;

    /**
     * The walker need Rules for walking through all nodes. The default rule set is
     * defined in the rule folder, but it could be changed, to serve other rules for
     * other languages etc.
     * @param rules
     */
    setRules(rules: IRuleSet): void;
}