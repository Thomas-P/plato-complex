/**
 * Created by ThomasP on 29.06.2016.
 */

let fileSystem = require('fs');
let Rx = require('rxjs/rx');
import {AsyncSubject} from "rxjs/AsyncSubject";

/**
 *  Read a file and give the result as an observable back.
 * @param fileName
 */
export function readFile(fileName:string):AsyncSubject<string> {
    let subject:AsyncSubject<string> = new Rx.AsyncSubject();
    fileSystem.readFile(fileName, (err, data) => {
        if (err) {
            subject.error(err);
        } else {
            subject.next(data.toString('UTF-8'));
        }
        subject.complete();
    });
    return subject;
}


