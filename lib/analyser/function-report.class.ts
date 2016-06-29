import {ISloc} from "../.interfaces/report/sloc.interface";
import {IFunctionReport, ICalculateMetricsResult} from "../.interfaces/report/function-report.interface";
import {IHalstead} from "./halstead/halstead.interface";
import {Halstead} from "./halstead/halstead.class";
/**
 * Created by ThomasP on 24.06.2016.
 */


export class FunctionReport implements IFunctionReport {
    private $sloc:ISloc;
    private $halstead:IHalstead;


    name:string;

    /**
     * create sloc on first reading
     * @returns {ISloc}
     */
    get sloc():ISloc {
        if (!this.$sloc) {
            this.$sloc = {
                logical: 0,
                physical: 0
            }
        }
        return this.$sloc;
    }


    cyclomatic:number;


    /**
     * create halstead on first reading
     * @returns {IHalstead}
     */
    get halstead():IHalstead {
        if (!this.$halstead) {
            this.$halstead = new Halstead();
        }
        return this.$halstead;
    }


    paramCount:number;
    startLine:number;
    cyclomaticDensity:number;

    constructor() {
        this.name = '';
        this.cyclomatic = 1;
        this.paramCount = 0;
        this.startLine = 0;
        this.cyclomaticDensity = 0;
    }


    calculateMetrics():ICalculateMetricsResult {
        this.cyclomaticDensity = (this.cyclomatic / this.sloc.logical) * 100;
        this.halstead.calculateHalsteadMetrics();
        return {
            loc: this.sloc.logical,
            cyclomatic: this.cyclomatic,
            effort: this.halstead.effort,
            paramCount: this.paramCount,
        };
    }
}