import {IParser, IParserConfig} from "../../lib/.interfaces/parser/parser.interface";
import {Observable} from "rxjs/Rx";
/**
 * Created by ThomasP on 30.06.2016.
 */

let esprima = require('esprima');

let Subject = require('rxjs/Subject').Subject;

export class EsPrimaParser implements IParser {
    /**
     * Parse a string and give an ESTree.Node back
     * @see interface
     * @param fileData
     * @returns {Subject}
     */
    parse<U>(fileData:Observable<string>):Observable<ESTree.Node> {
        let subject = new Subject();
        fileData.subscribe({
            next(fileData:string)  {
                subject.next(esprima.parse(fileData))
            },
            error(e)  {
                subject.error(e);
            },
            complete() {
                subject.complete();
            }
        });
        return subject;

    }

    /**
     * not implemented for now
     * @param config
     */
    setConfig(config:IParserConfig) {
    }


}