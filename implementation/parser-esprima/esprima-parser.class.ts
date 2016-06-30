import {IParser, IParserConfig} from "../../lib/.interfaces/parser/parser.interface";
import IScheduler = Rx.IScheduler;
/**
 * Created by ThomasP on 30.06.2016.
 */

let esprima = require('esprima');
let Rx = require('rx');

export class EsPrimaParser implements IParser {
    parse<U>(fileData:Rx.Observable<string>):Rx.Observable<ESTree.Node> {
        let subject = new Rx.Subject();
        fileData.subscribe(
            (fileData) =>  { subject.onNext(esprima.parse(fileData)) },
            (error) => { subject.onError(error); },
            () => { subject.onCompleted() }
        );
        return subject;

    }

    setConfig(config:IParserConfig) {
    }


}