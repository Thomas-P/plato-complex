import {IFunctionReport, IFunctionReportAttributes} from "./function-report.interface";
import {IWalkerCommand} from "../walker/walker.interface";
export {IFunctionReportAttributes, IFunctionReport} from "./function-report.interface";
/**
 * Created by ThomasP on 24.06.2016.
 */


/**
 * Reverse engineered by createReport function on module.js Line 83
 */
export interface IReport extends IReportAttributes {
    aggregate: IFunctionReportAttributes;
    functions: Array<IFunctionReport>;

    processCommands<T>(command: IWalkerCommand<T>);
    finishReport();
    toJSON(): IReportAttributes;
}

/**
 * Attributes for reports 
 * External for toJSON objects
 */
export interface IReportAttributes {
    aggregate: IFunctionReportAttributes;
    functions: Array<IFunctionReportAttributes>;
    dependencies: Array<IReportDependencies>;
    maintainablility: number;
    loc: number;
    cyclomatic: number;
    effort: number;
    params: number;
    
    
    path: string;
    /**
     * give the absolute file position
     */
    absolute: string;
    /**
     * dir from where the file called
     */
    dir: string;
}


export interface IReportDependencies {
    line: number;
    path: string;
    type: string;
}