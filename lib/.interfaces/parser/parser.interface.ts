
/**
 * Created by ThomasP on 29.06.2016.
 */

/**
 * interface for the configuration of the parser
 */
export interface IParserConfig {

}

/**
 * Interface for the parser
 */
export interface IParser {
    setConfig(config: IParserConfig);
    parse<U>(fileData: Rx.Observable<string>): Rx.Observable<U>
}