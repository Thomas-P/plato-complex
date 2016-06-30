import {IParser, IParserConfig} from "../../lib/.interfaces/parser/parser.interface";
/**
 * Created by ThomasP on 30.06.2016.
 */

let esprima = require('esprima');

let Subject= require('rxjs/Subject').Subject;
import {Observable} from "rxjs/Rx";

export class EsPrimaParser implements IParser {
    parse<U>(fileData: Observable<string> ):Observable<ESTree.Node> {
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

    setConfig(config:IParserConfig) {
    }


}