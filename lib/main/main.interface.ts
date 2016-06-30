import {IReportSettings} from "../.interfaces/report/report-settings.interface";
import {Observable} from "rxjs/Observable";
import {IWalker} from "../.interfaces/walker/walker.interface";
import {IReport} from "../.interfaces/report/report.interface";
import {IAnalyser} from "../.interfaces/analyser/analyser.interface";
/**
 * Created by ThomasP on 27.06.2016.
 */


export interface IMain {


    /**
     * This is the setting interface,
     * that will provide a setting object with
     * the possible attributes for changing the report queries
     */
    settings:IReportSettings;


    /**
     * add files for the main cycle. The dependencies will be also load,
     * when the files will be parsed. A special command keeps then from tracking the nodes
     * @param files
     */
    addFiles(...files:Array<string>);




    /**
     * It is possible to implement an own walker instead of using them in this module.
     * @param walker
     */
    setWalker(walker:IWalker);


    /**
     * add analyser to the chain
     * for example by import halstead from this module.
     * You can add every analyser by implementing the interface
     * main.addAnalyser(new HalsteadAnalyser());
     * @param analyser
     */
    addAnalyser(...analyser:Array<IAnalyser>);


    /**
     * Start with walking among the files and build up the report
     * It will give Reports for every file and dependency multiplied with every analyser.
     */
    init():Observable<IReport>;

}