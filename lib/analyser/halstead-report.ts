/**
 * Created by ThomasP on 24.06.2016.
 */
import {IReport, IReportDependencies, IReportAttributes} from "../.interfaces/report/report.interface";
import {
    IFunctionReport,
    IFunctionReportAttributes,
    ICalculateMetricsResult
} from "../.interfaces/report/function-report.interface";
import {FunctionReport} from "./function-report.class";
import {IReportSettings} from "../.interfaces/report/report-settings.interface";
import {IHalsteadOperatorsAndOperands} from "./halstead/halstead.interface";
import {IRuleResultScope, IRuleResult} from "../.interfaces/rules/rule-result.interface";
import {IWalkerCommand, WalkerCommand} from "../.interfaces/walker/walker.interface";
import {getDeepEntry} from "../.helper/getDeepEntry";

enum Indices {
    loc = 0,
    cyclomatic = 1,
    effort = 2,
    paramCount = 3,
}

export class HalsteadReport implements IReport {
    /**
     * return a json object, that allows you to safe a clean version
     * @returns {IReportAttributes}
     */
    toJSON():IReportAttributes {
        return {
            aggregate: this.aggregate.toJSON(),
            cyclomatic: this.cyclomatic || 0,
            dependencies: this.dependencies,
            effort: this.effort || 0,
            functions: this.functions.map((func) => func.toJSON()),
            loc: this.loc || 0,
            maintainablility: this.maintainablility || 0,
            params: this.params || 0,
            path: this.path || '',
            dir: this.dir || '',
            absolute: this.absolute || '',
        };
    }

    private $functionStack:Array<IFunctionReport> = [];


    /**
     * Aggregation attribute with initialisation
     */
    private $aggregate:IFunctionReport;

    get aggregate():IFunctionReport {
        if (!this.$aggregate) {
            this.$aggregate = new FunctionReport();
        }
        return this.$aggregate;
    }

    functions:Array<IFunctionReport> = [];
    dependencies:Array<IReportDependencies> = [];
    maintainablility:number = 0;
    loc:number = 0;
    cyclomatic:number = 0;
    effort:number = 0;
    params:number = 0;
    /**
     * File Parameter
     */
    path:string;
    absolute:string;
    dir:string;
    // report settings 
    // @todo Process it
    settings:IReportSettings;


    /**
     * add a new dependency to the report
     * @param path
     * @param line
     * @param type
     */
    addDependency(path:string, line:number, type?:any) {
        if (this.dependencies.some((dep) => dep.path === path)) {
            return;
        }
        let dependency:IReportDependencies = {
            path: path,
            line: line,
            type: type,
        };
        this.dependencies.push(dependency);
    }

    /**
     * return the actual node report
     */
    get actualReport() {
        let length = this.functions.length;
        if (length) {
            return this.functions[length - 1];
        }
        return undefined;
    }


    /**
     * update a list of identifiers on a halstead metric, that could be operands or operators
     * @param identifierArray
     * @param oo
     */
    private processAllOperandsOrOperators(identifierArray:Array<string>, oo:IHalsteadOperatorsAndOperands) {
        let update = (identifier:string) => {
            oo.total += 1;
            if (oo.identifiers.indexOf(identifier) === -1) {
                oo.identifiers.push(identifier);
                oo.distinct += 1;
            }
        };
        if (Array.isArray(identifierArray) && identifierArray.length) {
            identifierArray.forEach(update);
        }
    }


    /**
     * create a new HalsteadReport and push it on a scope stack
     * @param functionScope
     *      This is the object given from the walker
     */
    private defineSubFunction(functionScope:IRuleResultScope) {
        let report = new FunctionReport();


        report.startLine = functionScope.start;
        report.name = functionScope.name || '';
        report.paramCount = functionScope.paramCount;
        report.sloc.physical = functionScope.length;


        this.functions.push(report);
        this.$functionStack.push(report);
    }


    /**
     * Leaves a defined function and check if the leave is correct
     * @param name
     */
    private leaveSubFunction(name) {
        if (!this.actualReport) {
            return;
        }
        if (this.actualReport.name !== name) {
            throw new Error(`Cannot close function definition: Await ${name} got ${this.actualReport.name}`)
        }
        this.$functionStack.pop();
    }


    /**
     * process every node and calculate the sums for logical and cyclomatic complexity
     * @param command
     * @param syntax
     */
    private processNode<T>(syntax:IRuleResult<T>) {
        /**
         * Do not copy and paste method, because every update must be run for aggregate and actual report
         * @param report
         */
        let process = (report:IFunctionReportAttributes) => {
            report.sloc.logical += syntax.lloc;
            report.cyclomatic += syntax.cyclomatic;
            this.processAllOperandsOrOperators(syntax.operators, report.halstead.operators);
            this.processAllOperandsOrOperators(syntax.operands, report.halstead.operands);
        };
        process(this.aggregate);
        if (this.actualReport) {
            process(this.actualReport);
        }
    }


    /**
     * public method to process all commands for a file
     * @param command
     *      single walker command
     */
    processCommands<T>(command:IWalkerCommand<T>) {
        switch (command.cmd) {
            case WalkerCommand.addDependency:
                let data:IReportDependencies = <IReportDependencies>command.data;
                this.addDependency(data.path, data.line, data.type);
                break;
            case WalkerCommand.visitNode:
            {
                let result:IRuleResult<T> = <IRuleResult<T>>command.data;
                this.processNode(result);
                if (result.newScope) {
                    this.defineSubFunction(result.newScope);
                }
                break;
            }
            case WalkerCommand.leaveNode:
            {
                let result:IRuleResult<T> = <IRuleResult<T>>command.data;
                if (result.newScope) {
                    this.leaveSubFunction(result.newScope.name);
                }
                break;
            }
        }
    }


    /**
     * finish the report and calculate the result
     */
    finishReport() {
        let count = this.functions.length;
        let sums = [0, 0, 0, 0];
        /**
         * convert metrics result object to sum array
         * @param metricSums
         */
        let addSums = (metricSums:ICalculateMetricsResult) => {
            ['loc', 'cyclomatic', 'effort', 'paramCount'].forEach((key:string, index:number) => {
                sums[index] = metricSums[key];
            });
        };


        this.functions.forEach((report) => {
            let result = report.calculateMetrics();
            addSums(result);
        });
        let resultMetric = this.aggregate.calculateMetrics();
        if (count === 0) {
            addSums(resultMetric);
            count++;
        }
        //
        // get the average and maintainability index
        //
        let averages = sums.map((sum) => sum / count);
        let maintainability = this.calculateMaintainabilityIndex(
            averages[Indices.effort],
            averages[Indices.cyclomatic],
            averages[Indices.loc],
            <boolean>getDeepEntry(this.settings, 'asPercentage')
        );
        this.effort = averages[Indices.effort];
        this.cyclomatic = averages[Indices.cyclomatic];
        this.loc = averages[Indices.loc];
        this.params = averages[Indices.paramCount];
    }


    /**
     * Calculate the maintain ability as an index
     * It is a internal function, but allowes to
     * @param averageEffort
     * @param averageCyclomatic
     * @param averageLoc
     * @param asPercentage
     * @returns {number}
     */
    private calculateMaintainabilityIndex(averageEffort:number,
                                          averageCyclomatic:number,
                                          averageLoc:number,
                                          asPercentage:boolean) {

        if (averageCyclomatic === 0) {
            throw new Error('Encountered function with cyclomatic complexity zero!');
        }

        let maintainability:number =
            171 -
            (3.42 * Math.log(averageEffort)) -
            (0.23 * Math.log(averageCyclomatic)) -
            (16.2 * Math.log(averageLoc));

        if (maintainability > 171) {
            maintainability = 171;
        }

        if (asPercentage) {
            maintainability = Math.max(0, (maintainability * 100) / 171);
        }

        return maintainability;
    }
}
