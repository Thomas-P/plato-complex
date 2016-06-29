import {IFunctionReport, IFunctionReportAttributes} from "./function-report.interface";
import {IWalkerCommand} from "../walker/walker.interface";
export {IFunctionReportAttributes, IFunctionReport} from "./function-report.interface";
/**
 * Created by ThomasP on 24.06.2016.
 */


/**
 * Reverse engineered by createReport function on module.js Line 83
 */
export interface IReport {
    aggregate: IFunctionReportAttributes;
    functions: Array<IFunctionReport>;
    dependencies: Array<IReportDependencies>;
    maintainablility: number;
    loc: number;
    cyclomatic: number;
    effort: number;
    params: number;
    path: string;

    processCommands<T>(command: IWalkerCommand<T>);
    finishReport();
}


export interface IReportDependencies {
    line: number;
    path: string;
    type: any;
}