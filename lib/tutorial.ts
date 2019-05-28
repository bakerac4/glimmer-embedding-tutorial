import { Cursor } from '@glimmer/interfaces';
import { Context } from '@glimmer/opcode-compiler';
import { artifacts } from '@glimmer/program';
import { AotRuntime, renderAot, renderSync } from '@glimmer/runtime';
import createHTMLDocument from '@simple-dom/document';
import { SimpleElement } from '@simple-dom/interface';
import Serializer from '@simple-dom/serializer';
import voidMap from '@simple-dom/void-map';

import { Compilable, RESOLVER_DELEGATE } from './context';
import { RUNTIME_RESOLVER } from './env';

let firstPage = `<FirstPage/>`;
let secondPage = `<SecondPage/>`;

let context = Context(RESOLVER_DELEGATE);
let firstMain = Compilable(firstPage).compile(context);
let secondMain = Compilable(secondPage).compile(context);
let payload = artifacts(context);

let document = createHTMLDocument();
let runtime = AotRuntime(document, payload, RUNTIME_RESOLVER);
let firstElement = document.createElement('test1');
let firstCursor: Cursor = { element: firstElement, nextSibling: null };
let secondElement = document.createElement('test2');
let secondCursor: Cursor = { element: secondElement, nextSibling: null };

let iterator = renderAot(runtime, firstMain, firstCursor);
let result = renderSync(runtime.env, iterator);

console.log(serialize(firstElement));
runtime.env.begin();
result.rerender();
runtime.env.commit();
console.log(serialize(firstElement));

let iterator2 = renderAot(runtime, secondMain, secondCursor);
let result2 = renderSync(runtime.env, iterator2);

console.log(serialize(secondElement));
runtime.env.begin();
result2.rerender();
runtime.env.commit();
console.log(serialize(secondElement));

function serialize(element: SimpleElement) {
    return new Serializer(voidMap).serialize(element);
}
