import {IAnalyser} from "../.interfaces/analyser/analyser.interface";
import {IReport} from "../.interfaces/report/report.interface";
import {IWalkerCommand} from "../.interfaces/walker/walker.interface";
import {HalsteadReport} from "./halstead-report";
import {Observable} from "rxjs/Observable";
/**
 * Created by ThomasP on 29.06.2016.
 */


let Rx = require('rxjs/rx');


export class HalsteadAnalyser implements IAnalyser {


    /**
     * unused function for now
     * @todo: check for implementation
     * @param config
     */
    config(config:Object) {

    }


    /**
     *  Observable transformer function that get a observable and returns the transformation observable
     * @param s
     */
    calculate(s:Observable<IWalkerCommand<ESTree.Node|string>>):Observable<IReport> {
        let report:IReport = new HalsteadReport();
        let result = new Rx.Subject();
        s.subscribe({
            next(c) {
                report.processCommands(c)
            },
            error(e) {
                result.error(e)
            },
            complete() {
                report.finishReport();
                result.next(report);
                result.complete();
            }
        });
        return result;
    }

}