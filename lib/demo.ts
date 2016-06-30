import {EsPrimaParser} from "../implementation/parser-esprima/esprima-parser.class";
import {Main} from "./main/main.class";
import {HalsteadAnalyser} from "./analyser/halstead-analyser";
import {Walker} from "./walker/walker.class";
/**
 * Created by ThomasP on 23.06.2016.
 */
import {esPrimaRules} from '../implementation/rules-esprima/index';
import {IReport, IReportAttributes} from "./.interfaces/report/report.interface";

let metrics: Array<IReportAttributes> = [];

/**
 * set up walker
 * @type {Walker}
 */
let walker = new Walker();
walker.setRules(esPrimaRules);
/**
 * instantiate main
 * @type {Main}
 */
let main = new Main();
// set walker
main.setWalker(walker);
// set parser
main.setParser(new EsPrimaParser());
// add files
main.addFiles('lib/index.js');
// add analysers
main.addAnalyser(new HalsteadAnalyser());
// run
main
    .init()
    .subscribe({
        next(report: IReport) {
            metrics.push(report.toJSON());
        },
        error(e) {
            console.log('ERROR OCCURRED');
            console.error(e);
        },
        complete() {
            require('fs').writeFile('metrics.json', JSON.stringify(metrics), (err) => {
                if (err) {
                    console.log('ERROR OCCURRED - Unable to write metrics.json');
                    console.error(err);
                } else {
                    console.log(`metrics are saved in ${process.cwd()}`);
                }
            });
        }
    });