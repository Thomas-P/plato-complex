/**
 * Created by ThomasP on 30.06.2016.
 */


/**
 * Merges the object from into to
 * @param to
 * @param from
 * @param excludes
 */
export function merge(to, from, ...excludes:Array<string>) {
    to = (typeof to === 'object') && (to !== null) ? to : {};
    if (typeof from !== 'object') {
        return;
    }
    Object
        .keys(from)
        .filter((name) => excludes.length === 0 || excludes.every((exclude) => exclude !== name))
        .forEach((name) => {
            if (typeof from[name] === 'object') {
                to[name] = {};
                merge(to[name], from[name]);
            } else {
                to[name] = from[name];
            }
        });
}

/**
 * extend to with the other objects. deep copy only the keys which are own properties
 * @param to
 * @param others
 * @returns {{}|any}
 */
export function extend(to, ...others) {
    to = typeof to === 'object' && to !== null ? to : {};
    others
        .filter((obj) => typeof obj === 'object')
        .forEach((obj) => merge(to, obj));
    return to;
}
