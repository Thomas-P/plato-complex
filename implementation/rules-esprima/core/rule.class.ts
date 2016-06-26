import {MemberExpression} from "../rules/MemberExpression";
import {Identifier} from "../rules/Identifier";
import {Literal} from "../rules/Literal";
import {IRule} from "../../../lib/rule/rule.interface";
import {IRuleResult} from "../../../lib/rule/rule-result.interface";
import {getPropertyNameHelper} from "./propertyNameHelper";
/**
 * Created by ThomasP on 25.06.2016.
 */



export abstract class EsPrimaRule implements IRule {

    /**
     * This method is abstract and must be implemented in the rule folder
     * @param node
     * @param settings
     * @param assignedName
     */
    abstract processNode<U>(node:ESTree.Node, settings:U, assignedName?:string):IRuleResult<ESTree.Node>;



    /**
     * Helper method to get the nodes, which should be visited next
     * @param node
     * @param names
     * @returns {Array<Statement>}
     */
    protected getNodesToVisit(node: ESTree.Node, ...names: Array<string>): Array<ESTree.Node> {
        if (!node || !Array.isArray(names)) {
            return [];
        }
        return names
            .map((name: string) => <ESTree.Node>node[name])
            .filter((exists) => !!exists);
    }


    /**
     * Helper method for safe names
     * @param object
     * @param defaultName
     * @returns {string}
     */
    static safeName(object, defaultName?: string): string {
        if (object && typeof object.name === 'string' && object.name.length) {
            return object.name;
        }
        if (typeof defaultName === 'string' && defaultName.length) {
            return defaultName;
        }
        return '<anonymous>';
    }


    /**
     * Helper method for generating properties
     * @param node
     * @returns {string}
     */
    static getPropertyNameHelper = getPropertyNameHelper;
}