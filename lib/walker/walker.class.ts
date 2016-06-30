import {IWalker, WalkerCommand, IWalkerCommand} from "../.interfaces/walker/walker.interface";
import {IRuleSet} from "../.interfaces/rules/rule-set.interface";
import {IRuleResult} from "../.interfaces/rules/rule-result.interface";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {IReportDependencies} from "../.interfaces/report/report.interface";
import {IReportSettings} from "../.interfaces/report/report-settings.interface";

/**
 * Created by ThomasP on 22.06.2016.
 */

let Rx = require('rxjs/rx');

/**
 * @see interface
 */
export class Walker<T, U> implements IWalker {
    private $rules:IRuleSet;

    /**
     * @see interface
     * @param program
     * @returns {Observable<IWalkerCommand>}
     */
    walk(settings:IReportSettings, program:Observable<T>):Observable<IWalkerCommand<T>> {
        // @todo: default fallback?
        settings = settings || {};
        let result:Subject<IWalkerCommand<T>> = new Rx.Subject();
        program.subscribe(
            (program:T) => {
                this.visitNode(settings, program)
                    .filter((command) => !!command)
                    .forEach((r) => result.next(r));
            },
            (e) => result.error(e),
            () => result.complete()
        );
        return result;
    }


    /**
     * @todo implement create new scope -> better way is to implement a scope object that represent a new scope
     * @param node
     * @param assignedName
     * @returns {Observable<IWalkerCommand>}
     */
    private visitNode(settings:IReportSettings, node:T, assignedName?:string):Array<IWalkerCommand<T>> {
        if (!node || typeof node !== 'object') {
        }
        let result:IRuleResult<T> = this.$rules.processNode(node, settings, assignedName);

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
            ...this.visitNodeList(settings, result.nextNodes, result.assignableName),
        ];

        //
        // Dependencies
        //
        if (Array.isArray(result.dependencies)) {
            resultArray.push(
                ...result
                    .dependencies
                    .filter(file => !!file)
                    .map((file:IReportDependencies) => {
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
    private visitNodeList(settings:IReportSettings, node:Array<T>, assignedName?:string):Array<IWalkerCommand<T>> {
        return Array.prototype.concat(
            ...node.map((node:T|Array<T>) => {
                return Array.isArray(node) ? this.visitNodeList(settings, node, assignedName) : this.visitNode(settings, node, assignedName);
            }));
    }

    /**
     * @see interface
     * @param rules
     */
    setRules(rules:IRuleSet):void {
        this.$rules = rules;
    }
}
