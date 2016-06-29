import Observable = Rx.Observable;
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
export interface IParser<U> {
    setConfig(config: IParserConfig);
    parse(fileData: string): Observable<U>
}