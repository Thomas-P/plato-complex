import {Walker} from "../walker/walker.class";
import {IMain} from "./main.interface";
import {IParser} from "../parser/parser.interface";
import {IWalker, IWalkerCommand, WalkerCommand} from "../.interfaces/walker/walker.interface";
import {IRuleSet} from "../.interfaces/rules/rule-set.interface";
import Observable = Rx.Observable;
import {IAnalyser} from "../.interfaces/analyser/analyser.interface";
import {IReport} from "../.interfaces/report/report.interface";
import {readFile} from "../.helper/fileReader";
import {IReportSettings} from "../.interfaces/report/report-settings.interface";
import Subject = Rx.Subject;
import AsyncSubject = Rx.AsyncSubject;

/**
 * Created by ThomasP on 27.06.2016.
 */

let defaultWalker = new Walker();

export class Main<ParserResult> implements IMain {
    //
    // Parser, Walker and RuleSet
    //
    private $parser: IParser<ParserResult>;
    private $walker: IWalker;
    private $ruleSet: IRuleSet;
    private $settings: IReportSettings = {};
    //
    // file data
    //
    private $filesDataObservableMap: Map<string, Observable<string>> = new Map();
    private $files: Array<string> = [];
    //
    // analysers
    //
    private $analysers: Array<IAnalyser>;


    /**
     * Constructor
     */
    constructor() {
        this.$walker = defaultWalker;
    }


    setSettings(settings: IReportSettings) {
        this.$settings = settings || {};
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
    
    setParser(parser: IParser<ParserResult>) {
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



    /**
     * 
     * @param fileName
     * @param dirName
     * @returns {Observable<TResult>}
     */
    private fileProcessor<T>(fileName: string, dirName?: string): Observable<IReport> {
        //
        // for absolute and relative file path checking
        //
        if (!dirName) {
            dirName = process.cwd();
        }
        // init walker
        let walker = this.$walker;
        //
        // check if the file is present @todo make filepath absolute
        //


        let fileObserver: Observable<string> = readFile(fileName);
        if (this.$filesDataObservableMap.has(fileName)) {
            return;
        } else {
            fileObserver = readFile(fileName);
            this.$filesDataObservableMap.set(fileName, fileObserver);
        }
        //
        // This is the result after read file
        //
        let syntaxRulesObservable = readFile(fileName)
            .map((fileData: string) => null)
            .map((AST) => walker.walk(AST))
            .concatAll();



        /**
         * Get all Dependencies from a Walker source
         * @todo have to filter if the file is allowed
         * @type {Observable<string|IRuleResult<IWalkerCommand>>}
         */
        let dependencies:Observable<string> = syntaxRulesObservable
            //
            // filter the dependencies for files and get the file names back
            //
            .filter((cmd: IWalkerCommand<T>) => {
                return cmd.cmd == WalkerCommand.addDependency
                    && typeof cmd.data === 'string'
                    && String(cmd.data).length > 0
            })
            .map((cmd: IWalkerCommand<string>) => <string>cmd.data);


        //
        // return the report result. Every item is a report from
        //
        return Rx.Observable
            .fromArray(
                this.$analysers
            ).map(
                (analyser: IAnalyser) => analyser.calculate(syntaxRulesObservable)
            )
            //
            // merging result and the dependencies
            //
            .merge(
                dependencies
                    //
                    // Mapping dependencies to create file processor result
                    //
                    .map(
                        (fileName) => this.fileProcessor(fileName, dirName)
                    )
                    //
                    // if the file already exists, than it has no result
                    // the check will be in fileProcessor
                    //
                    .filter((hasResult) => !!hasResult)
            )
            .concatAll();
    }

    /**
     * Start with walking among the files and build up the report
     */
    init(): Observable<IReport> {
        return <Observable<IReport>>Rx.Observable.create((observer) =>{
            let errors = 0;
            if (this.$analysers.length === 0) {
                observer.onError(`There are no analyse tools in the chain, cannot start with reporting.`);
                errors++;
            }
            if (this.$files.length === 0) {
                observer.onError(`There are no files selected, cannot start with reporting.`);
                errors++;
            }
            if (!this.$walker) {
                observer.onError(`There are no AST walker specified, cannot start with reporting.`);
                errors++;
            }
            if (!this.$walker) {
                observer.onError(`There are no AST walker specified, cannot start with reporting.`);
                errors++;
            }
            if (errors == 0) {
                let job = Rx.Observable
                    .fromArray(this.$files)
                    .map((fileName: string) => this.fileProcessor(fileName, process.cwd()))
                    .concatAll();
                job.subscribe(observer);
            } else {
                observer.onCompleted();
            }
        });
    }

}