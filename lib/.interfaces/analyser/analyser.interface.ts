import {Observable} from 'rxjs/Observable';
import {AsyncSubject} from 'rxjs/AsyncSubject';
import {Subject} from 'rxjs/Subject';
import {IWalkerCommand} from "../walker/walker.interface";
import {IReport} from "../report/report.interface";
/**
 * Created by ThomasP on 28.06.2016.
 */


/**
 * The Analyser encapsulate a reporting mechanism, in this package as an IReport interface for Halstead metrics
 * For other metrics, it should be more generic
 */
export interface IAnalyser {
    config(config: Object);
    /**
     * Transformer for the report analyse
     * It will get all nodes and on end it will report the implemented report
     * @param s
     */
    calculate<T>(s: Observable<IWalkerCommand<T>>): Observable<IReport>;
}