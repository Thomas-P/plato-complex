/**
 * Created by ThomasP on 24.06.2016.
 */
import {ISloc} from "./sloc.interface";
import {IHalstead} from "../../analyser/halstead/halstead.interface";


/**
 *
 * Reverse engineered by createFunctionReport function on module.js Line 91
 */
export interface IFunctionReport extends IFunctionReportAttributes{
    name: string;
    calculateMetrics();
}

export interface ICalculateMetricsResult {
    loc: number;
    cyclomatic: number;
    effort: number;
    paramCount: number;
}
/**
 * this is used for aggregations only
 */
export interface IFunctionReportAttributes {
    sloc: ISloc;
    cyclomatic: number;
    halstead: IHalstead;
    paramCount: number;
    startLine: number;
    cyclomaticDensity: number;
}