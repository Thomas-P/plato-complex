import {IWalker, WalkerCommand, IWalkerCommand} from "./walker.interface";
import {IRuleSet} from "../rule/rule-set.interface";
import {IRuleResult} from "../rule/rule-result.interface";
/**
 * Created by ThomasP on 22.06.2016.
 */

let Rx = require('Rx');

export class Walker<T, U> implements IWalker {
    private $rules:IRuleSet;
    private $settings:U;

    /**
     * @see interface
     * @param program
     * @returns {Observable<IWalkerCommand>}
     */
    walk(program:T):Rx.Observable<IWalkerCommand> {
        return this.visitNode(program).filter((command) => !!command);
    }


    /**
     * @todo implement create new scope -> better way is to implement a scope object that represent a new scope
     * @param node
     * @param assignedName
     * @returns {Observable<IWalkerCommand>}
     */
    private visitNode(node:T, assignedName?:string):Rx.Observable<IWalkerCommand> {
        if (!node || typeof node !== 'object') {
            return;
        }
        let result:IRuleResult = this.$rules.processNode(node, this.$settings, assignedName);
        if (!result) {
            return Rx.Observer.throw(new Error('Could not get a result for node' + node.toString()));
        }

        return Rx.Observable.concatAll(
            //
            // return the rule for this
            //
            Rx.Observable.just({
                cmd: WalkerCommand.visitNode,
                data: result,
            }),
            //
            // return the nodes that have to visit next
            //
            this.visitNodeList(result.nextNodes, result.assignableName),
            //
            // leave node message
            //
            Rx.Observable.just({
                cmd: WalkerCommand.leaveNode,
                data: result,
            })
        );

    }


    /**
     * Visit a list of nodes
     * @param node
     * @param assignedName
     */
    private visitNodeList(node:Array<T>, assignedName?:string):Rx.Observable<IWalkerCommand> {
        return Rx.Observer
            .fromArray(node)
            .delay(0)
            // return a flat map of all visited nodes
            .flatMap((node) => this.visitNode(node, assignedName))
    }

    /**
     * @see interface
     * @param rules
     */
    setRules(rules:IRuleSet):void {
        this.$rules = rules;
    }

    /**
     * set the settings for the walker used in the process node method
     * @param settings
     */
    setSettings(settings: U) {
        this.$settings = settings;
    }

}
