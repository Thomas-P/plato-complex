/**
 * Created by ThomasP on 22.06.2016.
 */

export interface IHalstead extends IHalsteadState{
    /**
     * @default:
     */
    vocabulary: number;
    /**
     * @default:
     */
    difficulty: number;
    /**
     * @default:
     */
    volume: number;
    /**
     * @default:
     */
    effort: number;
    /**
     * @default:
     */
    bugs: number;
    /**
     * @default:
     */
    time: number;
    /**
     * @default: 0
     */
    length: number;

    /**
     * calculate the metrics
     */
    calculateHalsteadMetrics()
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

