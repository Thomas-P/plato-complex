/**
 * Created by ThomasP on 29.06.2016.
 */

let fileSystem = require('fs');
let Rx = require('rx');

/**
 *  Read a file and give the result as an observable back.
 * @param fileName
 */
export function readFile(fileName):Rx.Observable<string> {
    let subject = new Rx.AsyncSubject();
    fileSystem.readFile(fileName,(err, data) => {
        if (err) {
            subject.onError(err);
        } else {
            subject.onNext(data.toString('UTF-8'));
        }
        subject.onCompleted();
    });
    return subject;
}


