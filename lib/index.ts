import {EsPrimaParser} from "../implementation/parser-esprima/esprima-parser.class";
import {Main} from "./main/main.class";
import {HalsteadAnalyser} from "./analyser/halstead-analyser";
import {readFile} from "./.helper/fileReader";
import {Walker} from "./walker/walker.class";
/**
 * Created by ThomasP on 23.06.2016.
 */
import {esPrimaRules} from '../implementation/rules-esprima/index';



console.log(process.cwd());
let walker = new Walker();
walker.setRules(esPrimaRules);
let main = new Main();
main.setWalker(walker);
main.setParser(new EsPrimaParser());
main.addFiles('../.play/script.js');
main.addFiles('index.js');
main.addAnalyser(new HalsteadAnalyser());
main.init().subscribe(
    (o) => { console.log('A', o) },
    (e) => { console.error('E', e) }
);

//readFile('index.js').parse((o) => console.log(o));