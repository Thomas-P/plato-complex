import {ISettings} from "../deprecated/settings.interface";
import Observable = Rx.Observable;
import {IWalker} from "../walker/walker.interface";
/**
 * Created by ThomasP on 27.06.2016.
 */




export interface ICore {
    
    
    
    setSettings(settings: ISettings): void;



    getSettings(): ISettings;

    /**
     * add files for main
     * @param files
     */
    addFiles(...files: Array<string>);

    /**
     * set the output folder
     * @param folder
     */
    setOutputFolder(folder: string);



    setWalker(walker: IWalker): void;


    /**
     * add analyser to the chain
     * for example by import halstead
     * main.addAnalyser(main);
     * @param analyser
     */
    addAnalyser(...analyser:Array<any>): void;


    /**
     * Start with walking among the files and build up the report
     */
    report(): Observable<any>;

}