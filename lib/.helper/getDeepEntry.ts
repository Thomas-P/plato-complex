/**
 * Created by ThomasP on 27.06.2016.
 */

/**
 * simple object walker
 * @param obj
 * @param attributes
 * @returns {Object}
 */
export function getDeepEntry(obj:Object, ...attributes:Array<string>) {
    while (obj && attributes.length) {
        let entry = attributes.shift();
        obj = obj[entry];
    }
    return obj;
}