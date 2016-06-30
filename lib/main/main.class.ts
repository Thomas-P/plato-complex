import {Walker} from "../walker/walker.class";
import {IMain} from "./main.interface";
import {IParser} from "../.interfaces/parser/parser.interface";
import {IWalker, IWalkerCommand, WalkerCommand} from "../.interfaces/walker/walker.interface";
import {IRuleSet} from "../.interfaces/rules/rule-set.interface";
import {IAnalyser} from "../.interfaces/analyser/analyser.interface";
import {IReport, IReportDependencies} from "../.interfaces/report/report.interface";
import {readFile} from "../.helper/fileReader";
import {IReportSettings} from "../.interfaces/report/report-settings.interface";

let Rx = require('rxjs/rx');
import {Observable} from 'rxjs/Observable';
///<reference path="../../node_modules/rxjs/add/operator/filter.d.ts" />
///<reference path="../../node_modules/rxjs/add/operator/map.d.ts" />
///<reference path="../../node_modules/rxjs/add/operator/concat.d.ts" />
///<reference path="../../node_modules/rxjs/add/operator/concatAll.d.ts" />
///<reference path="../../node_modules/rxjs/add/observable/of.d.ts" />
///<reference path="../../node_modules/rxjs/add/observable/from.d.ts" />
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import {Settings} from "../settings/settings.class";
import {extend} from "../.helper/extend";
import {Subject, AsyncSubject} from "rxjs/Rx";

var path = require('path');

/**
 * Created by ThomasP on 27.06.2016.
 */

let defaultWalker = new Walker();

export class Main implements IMain {
    //
    // Parser, Walker and RuleSet
    //
    private $parser: IParser;
    private $walker: IWalker;
    private $ruleSet: IRuleSet;
    private $settings: IReportSettings = {};
    //
    // file data
    //
    private $files: Array<string> = [];
    //
    // analysers
    //
    private $analysers: Array<IAnalyser> = [];


    /**
     * Constructor
     */
    constructor() {
        this.$walker = defaultWalker;
    }


    get settings(): IReportSettings {
        if (!this.$settings) {
            this.$settings = new Settings();
        }
        return this.$settings;
    }

    /**
     * add files for main
     * @param files
     */
    addFiles(...files: Array<string>) {
        this.$files = this.$files
            .concat(files)
            //
            // unique the file result from adding
            //
            .reduce((prev:Array<string>, curr: string) => {
                if (prev.indexOf(curr) === -1) {
                    prev.push(curr);
                }
                return prev;
            }, []);
    }


    /**
     * set the walker
     * @param walker
     */
    setWalker(walker: IWalker) {
        this.$walker = walker;
    }


    setRules(ruleSet: IRuleSet) {
        this.$ruleSet = ruleSet;
    }

    setParser(parser: IParser) {
        this.$parser = parser;
    }


    /**
     * add analyser to the chain
     * for example by import halstead
     * main.addAnalyser(main);
     * @param analyser
     */
    addAnalyser(...analyser:Array<IAnalyser>) {
        this.$analysers = this.$analysers
            .concat(analyser)
            //
            // unique the analyser result from adding
            //
            .reduce((prev:Array<IAnalyser>, curr: IAnalyser) => {
                if (prev.indexOf(curr) === -1) {
                    prev.push(curr);
                }
                return prev;
            }, []);
    }


    private initFileProcess<T>(dirName?: string) {
        let result = new Rx.Subject();
        let count = this.$files.length;
        let visitedFiles: Array<string> = [];
        let settings: IReportSettings = extend({}, this.$settings);
        if (!dirName) {
            dirName = process.cwd();
        }
        let rootDir = dirName;
        // local file stack and settings
        let fileStack: Subject<string> = new Rx.Subject();

        /**
         * Processes one file and collect the dependencies
         * @param file
         */
        let processFile = (file: string) => {
            if (visitedFiles.indexOf(file) !== -1) {
                count--;
                return;
            }
            visitedFiles.push(file);
            //
            // for absolute and relative file path checking
            //
            //let dirRelative: string = path.dirname(fileRelative);

            let fileRelative: string = path.relative(rootDir, file);
            let filePosition: string = path.normalize(path.join(dirName, fileRelative));
            let dirPosition: string = path.dirname(filePosition);

            let fileObserver: Observable<string> = readFile(filePosition);
            let parse = this.$parser.parse(fileObserver);
            let walk = this.$walker.walk(settings, parse);
            let syntaxRulesObservable = walk;


            syntaxRulesObservable
                .filter((d: IWalkerCommand<T>) => d.cmd === WalkerCommand.addDependency)
                .map((d) => d.data)
                .subscribe({
                    next(fileObject: IReportDependencies) {
                        if (!fileObject ||
                            !fileObject.path ||
                            fileObject.path.startsWith('.')=== false ||
                            fileObject.path.startsWith(path.sep)) {
                            return;
                        }
                        // @todo: make it like CommonJS
                        let file = fileObject.path + '.js';
                        let depedencyPosition = path.join(dirPosition, file);

                        fileStack.next(depedencyPosition);
                        count++;
                    }
                });


            Rx.Observable
                .from(this.$analysers)
                .map((analyzer): IAnalyser => analyzer.calculate(syntaxRulesObservable))
                .concatAll()
                .subscribe({
                    next(next: IReport) {
                        next.path = file;
                        next.absolute = filePosition;
                        next.dir = dirName;
                        result.next(next);

                    },
                    error(e) {

                        result.error(e);

                    },
                    complete() {

                        count--;
                        console.log('Stack count: ', count);
                        if (count === 0) {
                            fileStack.complete();
                        }

                    }
                });
        };


        this.$files.forEach((file) => fileStack.next(file));
        fileStack.subscribe({
            next(fileName: string) {
                processFile(fileName);
            },
            error(e) {
                result.error(e);
            },
            complete() {
                console.log('complete');
                result.complete();

            }
        });
        this.$files.forEach((file) => fileStack.next(file));

        return result;
    }


    /**
     * Start with walking among the files and build up the report
     */
    init(): Observable<IReport> {
        let result = new Rx.Subject();
        let errors = 0;
        if (this.$analysers.length === 0) {
            result.error(`There are no analyse tools in the chain, cannot start with reporting.`);
            errors++;
        }
        if (this.$files.length === 0) {
            result.error(`There are no files selected, cannot start with reporting.`);
            errors++;
        }
        if (!this.$walker) {
            result.error(`There are no AST walker specified, cannot start with reporting.`);
            errors++;
        }
        if (!this.$parser) {
            result.error(`There are no parser specified, cannot start with reporting.`);
            errors++;
        }
        if (errors == 0) {
            this.initFileProcess().subscribe(result);
        } else {
            result.completed();
        }
        return result;
    }

}