import {IAnalyser} from "../.interfaces/analyser/analyser.interface";
import {IReport} from "../.interfaces/report/report.interface";
import {IWalkerCommand, WalkerCommand} from "../.interfaces/walker/walker.interface";
import {HalsteadReport} from "./halstead-report";
/**
 * Created by ThomasP on 29.06.2016.
 */

let Rx = require('rx');


export class HalsteadAnalyser implements IAnalyser {


    /**
     *
     * @param config
     */
    config(config: Object) {

    }


    /**
     *
     * @param s
     */
    calculate(s: Rx.Observable<IWalkerCommand<ESTree.Node|string>>): Rx.Observable<IReport> {
        let report: IReport = new HalsteadReport();
        let result = new Rx.Subject();
        s.subscribe(
            (c) => {
                report.processCommands(c)
            },
            (e) => {
                result.onError(e)
            },
            () => {
                report.finishReport();
                result.onNext(report);
                result.onCompleted();
            }
        );
        return result;
    }

}