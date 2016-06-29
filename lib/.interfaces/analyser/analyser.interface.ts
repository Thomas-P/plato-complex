import Observable = Rx.Observable;
import {IWalkerCommand} from "../walker/walker.interface";
import {IReport} from "../report/report.interface";
/**
 * Created by ThomasP on 28.06.2016.
 */



export interface IAnalyser {
    config(config: Object);
    calculate<T>(s: Observable<IWalkerCommand<T>>): Observable<IReport>;
}