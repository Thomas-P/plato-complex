import {IReportSettings} from "../.interfaces/report/report-settings.interface";
import Observable = Rx.Observable;
import {IWalker} from "../.interfaces/walker/walker.interface";
import {IReport} from "../.interfaces/report/report.interface";
/**
 * Created by ThomasP on 27.06.2016.
 */




export interface IMain {
    
    
    
    setSettings(settings: IReportSettings);


    /**
     * add files for main
     * @param files
     */
    addFiles(...files: Array<string>);




    setWalker(walker: IWalker);


    /**
     * add analyser to the chain
     * for example by import halstead
     * main.addAnalyser(main);
     * @param analyser
     */
    addAnalyser(...analyser:Array<any>);


    /**
     * Start with walking among the files and build up the report
     */
    init(): Observable<IReport>;

}