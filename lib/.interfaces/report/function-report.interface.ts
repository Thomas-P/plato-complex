/**
 * Created by ThomasP on 24.06.2016.
 */
import {ISloc} from "./sloc.interface";
import {IHalstead, IHalsteadAttributes} from "../../analyser/halstead/halstead.interface";


/**
 *
 * Reverse engineered by createFunctionReport function on module.js Line 91
 */
export interface IFunctionReport extends IFunctionReportAttributes{
    calculateMetrics();
    toJSON(): IFunctionReportAttributes
    halstead: IHalstead;
}

/**
 * Interface for calculated metrics
 */
export interface ICalculateMetricsResult {
    loc: number;
    cyclomatic: number;
    effort: number;
    paramCount: number;
}
/**
 * this is used for aggregations only and will be overwritten by the implementation interface
 * Has all attributes to get a some meta data from the functions
 */
export interface IFunctionReportAttributes {
    name: string;
    sloc: ISloc;
    cyclomatic: number;
    halstead: IHalsteadAttributes;
    paramCount: number;
    startLine: number;
    cyclomaticDensity: number;
}