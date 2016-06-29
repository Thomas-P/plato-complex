import {IHalstead, IHalsteadOperatorsAndOperands} from "./halstead.interface";
/**
 * Created by ThomasP on 22.06.2016.
 */


/**
 * Halstead object
 */
export class Halstead implements IHalstead {


    bugs:number;
    difficulty:number;
    effort:number;
    time:number;
    vocabulary:number;
    volume:number;
    length:number;


    /**
     * operator object will be created, when it will called
     */
    private $operators:IHalsteadOperatorsAndOperands;
    get operators() {
        if (!this.$operators) {
            this.$operators = {
                distinct: 0,
                identifiers: [],
                total: 0,
            };
        }
        return this.$operators
    }


    /**
     * operator object will be created, when it will called
     */
    private $operands:IHalsteadOperatorsAndOperands;
    get operands() {
        if (!this.$operands) {
            this.$operands = {
                distinct: 0,
                identifiers: [],
                total: 0,
            };
        }
        return this.$operands;
    }


    constructor() {
        this.bugs = 0;
        this.difficulty = 0;
        this.effort = 0;
        this.time = 0;
        this.vocabulary = 0;
        this.volume = 0;
    }

    /**
     * factory method for Halstead to create a new object
     * @returns {Halstead}
     */
    static createObject():Halstead {
        return new Halstead();
    }


    /**
     * Calculate the halstead metric
     */
    calculateHalsteadMetrics(): void {
        this.length = this.operators.total + this.operands.total;
        if (this.length === 0) {
            return;
        }
        this.vocabulary = this.operators.distinct + this.operands.distinct;
        this.difficulty =
            (this.operators.distinct / 2) *
            (this.operands.distinct === 0 ? 1 : this.operands.total / this.operands.distinct);
        this.volume = this.length * (Math.log(this.vocabulary) / Math.log(2));
        this.effort = this.difficulty * this.volume;
        this.bugs = this.volume / 3000;
        this.time = this.effort / 18;
    }



}
