import {getDeepEntry} from "../../../lib/.helper/getDeepEntry";
/**
 * Created by ThomasP on 26.06.2016.
 */


export function getLiteralExpressionNameHelper(node: ESTree.Literal): string {
    if (getDeepEntry(node, 'type') !== 'Literal') {
        return;
    }
    let value: string;
    if (typeof node.value === 'number') {
        value = String(node.value);
    } else if (typeof node.value === 'string') {
        value = `'${node.value}'`;
    } else {
        value = String(node.value);
    }
    return `${value}`;
}


export function getIdentifierExpressionNameHelper(node: ESTree.Identifier): string {
    if (getDeepEntry(node, 'type') !== 'Identifier') {
        return;
    }
    return node.name;
}

export function getMemberExpressionNameHelper(node: ESTree.MemberExpression): string {
    if (getDeepEntry(node, 'type') !== 'MemberExpression') {
        return;
    }
    let pre: string = getPropertyNameHelper(node.object);
    let post: string= getPropertyNameHelper(node.property);
    if (node.computed) {
        return `${pre}[${post}]`;
    }
    return `${pre}.${post}`;
}


export function getPropertyNameHelper(node: ESTree.Node): string {
    if (!node) {
        return;
    }
    let name: string;
    if (node.type === 'MemberExpression') {
        name = getMemberExpressionNameHelper(<ESTree.MemberExpression>node);
    } else if (node.type === 'Identifier') {
        name = getIdentifierExpressionNameHelper(<ESTree.Identifier>node);
    } else if (node.type === 'Literal') {
        name = getLiteralExpressionNameHelper(<ESTree.Literal>node);
    }
    return name;
}