import {IWalker, WalkerCommand, IWalkerCommand} from "../.interfaces/walker/walker.interface";
import {IRuleSet} from "../.interfaces/rules/rule-set.interface";
import {IRuleResult} from "../.interfaces/rules/rule-result.interface";

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
    walk(program: Rx.Observable<T>):Rx.Observable<IWalkerCommand<T>> {
        let result = new Rx.Subject();
        program.subscribe(
            (program: T) => {
                this.visitNode(program)
                    .filter((command) => !!command)
                    .forEach((r) => result.onNext(r));
            },
            (e) => result.onError(e),
            () => result.onCompleted()
        );
        return result;
    }


    /**
     * @todo implement create new scope -> better way is to implement a scope object that represent a new scope
     * @param node
     * @param assignedName
     * @returns {Observable<IWalkerCommand>}
     */
    private visitNode(node:T, assignedName?:string):Array<IWalkerCommand<T>> {
        if (!node || typeof node !== 'object') {
        }
        let result:IRuleResult<T> = this.$rules.processNode(node, this.$settings, assignedName);

        if (!result) {
            return;
            //new Error('Could not get a result for node ' + node.toString());
        }
        let resultArray = [
            //
            // return the rule for this
            //
            {
                cmd: WalkerCommand.visitNode,
                data: result,
            },
            //
            // return the nodes that have to visit next
            //
            ...this.visitNodeList(result.nextNodes, result.assignableName),
        ];

        //
        // Dependencies
        //
        if (Array.isArray(result.dependencies)) {
            resultArray.push(
                ...result
                    .dependencies
                    .filter(file => !!file)
                    .map((file:string) => {
                        return {
                            cmd: WalkerCommand.addDependency,
                            data: file,
                        }
                    })
            );
        }

        //
        // leave node message
        //
        resultArray.push({
            cmd: WalkerCommand.leaveNode,
            data: result,
        });

        return resultArray;
    }


    /**
     * Visit a list of nodes
     * @param node
     * @param assignedName
     */
    private visitNodeList(node:Array<T>, assignedName?:string):Array<IWalkerCommand<T>> {
        return Array.prototype.concat(
            ...node.map((node:T|Array<T>) => {
                return Array.isArray(node) ? this.visitNodeList(node, assignedName) : this.visitNode(node, assignedName);
            }));
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
    setSettings(settings:U) {
        this.$settings = settings;
    }

}
