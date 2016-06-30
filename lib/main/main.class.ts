import {Walker} from "../walker/walker.class";
import {IMain} from "./main.interface";
import {IParser} from "../.interfaces/parser/parser.interface";
import {IWalker, IWalkerCommand, WalkerCommand} from "../.interfaces/walker/walker.interface";
import {IRuleSet} from "../.interfaces/rules/rule-set.interface";
import {IAnalyser} from "../.interfaces/analyser/analyser.interface";
import {IReport} from "../.interfaces/report/report.interface";
import {readFile} from "../.helper/fileReader";
import {IReportSettings} from "../.interfaces/report/report-settings.interface";

let Rx = require('rx');

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
    private $filesDataObservableMap: Map<string, Rx.Observable<string>> = new Map();
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



    /**
     *
     * @param fileName
     * @param dirName
     * @returns {Rx.Observable<TResult>}
     */
    private fileProcessor<T>(fileName: string, dirName?: string) {
        //
        // for absolute and relative file path checking
        //
        if (!dirName) {
            dirName = process.cwd();
        }
        //
        // check if the file is present @todo make filepath absolute
        //


        let fileObserver: Rx.Observable<string> = readFile(fileName);
        if (this.$filesDataObservableMap.has(fileName)) {
            return;
        } else {
            this.$filesDataObservableMap.set(fileName, fileObserver);
        }
        //
        // This is the result after read file
        //
        let parse = this.$parser.parse(fileObserver);
        let walk = this.$walker.walk(parse);
        let syntaxRulesObservable = walk;

        let dependencies = syntaxRulesObservable
            .filter((d: IWalkerCommand<T>) => d.cmd === WalkerCommand.addDependency)
            .map((d) => this.fileProcessor(<string>d.data, dirName));

        return Rx.Observable
            .fromArray(this.$analysers)
            .map((analyzer): IAnalyser => analyzer.calculate(syntaxRulesObservable))
            .concatAll()
            .concat(dependencies);




        //return syntaxRulesObservable;

    }

    /**
     * Start with walking among the files and build up the report
     */
    init(): Rx.Observable<IReport> {
        let result = new Rx.Subject();
        let errors = 0;
        if (this.$analysers.length === 0) {
            result.onError(`There are no analyse tools in the chain, cannot start with reporting.`);
            errors++;
        }
        if (this.$files.length === 0) {
            result.onError(`There are no files selected, cannot start with reporting.`);
            errors++;
        }
        if (!this.$walker) {
            result.onError(`There are no AST walker specified, cannot start with reporting.`);
            errors++;
        }
        if (!this.$parser) {
            result.onError(`There are no parser specified, cannot start with reporting.`);
            errors++;
        }
        if (errors == 0) {
            Rx.Observable
                .fromArray(this.$files)
                .map((fileName: string) => this.fileProcessor(fileName, process.cwd()))
                .concatAll()
                .subscribe(result);
        } else {
            result.onCompleted();
        }
        return result;
    }

}