/**
 * Created by ThomasP on 22.06.2016.
 */

export interface IHalstead extends IHalsteadAttributes{
    /**
     * calculate the metrics
     */
    calculateHalsteadMetrics()

    /**
     * Create a raw Object with the given attributes
     */
    toJSON(): IHalsteadAttributes;
}


/**
 * These are the Attributes for the halstead metric
 */
export interface IHalsteadAttributes extends IHalsteadState {
    /**
     * @default: 0
     */
    bugs:number;
    /**
     * @default: 0
     */
    difficulty:number;
    /**
     * @default: 0
     */
    effort:number;
    /**
     * @default: 0
     */
    length: number;
    /**
     * @default: 0
     */
    time:number;
    /**
     * @default: 0
     */
    vocabulary:number;
    /**
     * @default: 0
     */
    volume:number;
}



/**
 * Reverse engineered by createInitialHalsteadState function on module.js Line 112
 */
export interface IHalsteadState {
    operators: IHalsteadOperatorsAndOperands,
    operands: IHalsteadOperatorsAndOperands,
}


/**
 *
 * Reverse engineered by createInitialHalsteadItemState function on module.js Line 119
 */
export interface IHalsteadOperatorsAndOperands {
    /**
     * @default: 0
     */
    distinct: number;
    /**
     * @default: 0 
     */
    total: number;
    /**
     * @default: []
     */
    identifiers: Array<string>
}

