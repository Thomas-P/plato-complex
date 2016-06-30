
/**
 * Created by ThomasP on 29.06.2016.
 */

import {Observable} from "rxjs/Observable";
/**
 * interface for the configuration of the parser
 */
export interface IParserConfig {

}

/**
 * Interface for the parser
 */
export interface IParser {
    /**
     * Not implemented for now.
     * @todo think about a good way to implement parser options
     * @param config
     */
    setConfig(config: IParserConfig);
    /**
     * the Parser will get a file string, can do crazy async stuff or what he wan't and
     * send the result to the subscriber
     *
     * @param fileData
     *      Observer that gives you the file data
     */
    parse<U>(fileData: Observable<string>): Observable<U>
}