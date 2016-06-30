import {IParser, IParserConfig} from "../../lib/.interfaces/parser/parser.interface";
/**
 * Created by ThomasP on 30.06.2016.
 */

let esprima = require('esprima');
let Rx = require('rx');

export class EsPrimaParser implements IParser {

    setConfig(config:IParserConfig) {
    }



    parse(fileData:Rx.Observable<string>):Rx.Observable<ESTree.Node> {
        let result = new Rx.Subject();
        fileData.subscribe(
            (fileData) => {
                result.onNext(esprima.parse(fileData));
            },
            result.onError,
            result.onCompleted
        );
        return result;
    }
}