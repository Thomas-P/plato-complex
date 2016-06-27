import {Walker} from "../walker/walker.class";
import {IWalker} from "../walker/walker.interface";
import {ICore} from "./core.interface";
import {ISettings} from "../deprecated/settings.interface";
import Observable = Rx.Observable;

/**
 * Created by ThomasP on 27.06.2016.
 */

export class Core implements ICore {


    setSettings(settings: ISettings) {

    }



    getSettings(): ISettings {
        return;
    }

    /**
     * add files for main
     * @param files
     */
    addFiles(...files: Array<string>) {

    }

    /**
     * set the output folder
     * @param folder
     */
    setOutputFolder(folder: string) {

    }



    setWalker(walker: IWalker) {

    }


    /**
     * add analyser to the chain
     * for example by import halstead
     * main.addAnalyser(main);
     * @param analyser
     */
    addAnalyser(...analyser:Array<any>) {

    }


    /**
     * Start with walking among the files and build up the report
     */
    report(): Observable<any> {

    }

}