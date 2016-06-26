import {EsPrimaRuleSet} from "./core/rule-set.class";
import {ArrayExpression} from "./rules/ArrayExpression";
import {AssignmentExpression} from "./rules/AssignmentExpression";
import {BinaryExpression} from "./rules/BinaryExpression";
import {IRuleSet} from "../../lib/rule/rule-set.interface";
import {BlockStatement} from "./rules/BlockStatement";
import {BreakStatement} from "./rules/BreakStatement";
import {CallExpression} from "./rules/CallExpression";
import {CatchClause} from "./rules/CatchClause";
import {ConditionalExpression} from "./rules/ConditionalExpression";
import {ContinueStatement} from "./rules/ContinueStatement";
import {DoWhileStatement} from "./rules/DoWhileStatement";
import {ExpressionStatement} from "./rules/ExpressionStatement";
import {ForInStatement} from "./rules/ForInStatement";
import {ForStatement} from "./rules/ForStatement";
import {FunctionDeclaration} from "./rules/FunctionDeclaration";
import {FunctionExpression} from "./rules/FunctionExpression";
import {Identifier} from "./rules/Identifier";
import {IfStatement} from "./rules/IfStatement";
import {Literal} from "./rules/Literal";
import {LogicalExpression} from "./rules/LogicalExpression";
import {MemberExpression} from "./rules/MemberExpression";
import {NewExpression} from "./rules/NewExpression";
import {ObjectExpression} from "./rules/ObjectExpression";
import {Property} from "./rules/Property";
import {ReturnStatement} from "./rules/ReturnStatement";
import {SequenceExpression} from "./rules/SequenceExpression";
import {SwitchCase} from "./rules/SwitchCase";
import {SwitchStatement} from "./rules/SwitchStatement";
import {ThisExpression} from "./rules/ThisExpression";
import {ThrowStatement} from "./rules/ThrowStatement";
import {TryStatement} from "./rules/TryStatement";
import {UnaryExpression} from "./rules/UnaryExpression";
import {VariableDeclaration} from "./rules/VariableDeclaration";
import {VariableDeclarator} from "./rules/VariableDeclarator";
import {WhileStatement} from "./rules/WhileStatement";
import {WithStatement} from "./rules/WithStatement";
/**
 * Created by ThomasP on 25.06.2016.
 */
// build rule set
let ruleSet:IRuleSet = new EsPrimaRuleSet();
/**
 * Export the rule set of es prima as 'esPrimaRules'
 */
export {ruleSet as esPrimaRules};

/**
 * @todo add rules for es6+7
 */
ruleSet.addRule('ArrayExpression', new ArrayExpression());
ruleSet.addRule('AssignmentExpression', new AssignmentExpression());
ruleSet.addRule('BinaryExpression', new BinaryExpression());
ruleSet.addRule('BlockStatement', new BlockStatement());
ruleSet.addRule('BreakStatement', new BreakStatement());
ruleSet.addRule('CallExpression', new CallExpression());
ruleSet.addRule('CatchClause', new CatchClause());
ruleSet.addRule('ConditionalExpression', new ConditionalExpression());
ruleSet.addRule('ContinueStatement', new ContinueStatement());
ruleSet.addRule('DoWhileStatement', new DoWhileStatement());
ruleSet.addRule('ExpressionStatement', new ExpressionStatement());
ruleSet.addRule('ForInStatement', new ForInStatement());
ruleSet.addRule('ForStatement', new ForStatement());
ruleSet.addRule('FunctionDeclaration', new FunctionDeclaration());
ruleSet.addRule('FunctionExpression', new FunctionExpression());
ruleSet.addRule('Identifier', new Identifier());
ruleSet.addRule('IfStatement', new IfStatement());
ruleSet.addRule('Literal', new Literal());
ruleSet.addRule('LogicalExpression', new LogicalExpression());
ruleSet.addRule('MemberExpression', new MemberExpression());
ruleSet.addRule('NewExpression', new NewExpression());
ruleSet.addRule('ObjectExpression', new ObjectExpression());
ruleSet.addRule('Property', new Property());
ruleSet.addRule('ReturnStatement', new ReturnStatement());
ruleSet.addRule('SequenceExpression', new SequenceExpression());
ruleSet.addRule('SwitchCase', new SwitchCase());
ruleSet.addRule('SwitchStatement', new SwitchStatement());
ruleSet.addRule('ThisExpression', new ThisExpression());
ruleSet.addRule('ThrowStatement', new ThrowStatement());
ruleSet.addRule('TryStatement', new TryStatement());
ruleSet.addRule('UnaryExpression', new UnaryExpression());
ruleSet.addRule('VariableDeclaration', new VariableDeclaration());
ruleSet.addRule('VariableDeclarator', new VariableDeclarator());
ruleSet.addRule('WhileStatement', new WhileStatement());
ruleSet.addRule('WithStatement', new WithStatement());
