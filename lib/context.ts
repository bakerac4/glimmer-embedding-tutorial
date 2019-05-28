import { precompile } from '@glimmer/compiler';
import { CAPABILITIES } from '@glimmer/component';
import { Component } from '@glimmer/opcode-compiler';

// A map of helpers to runtime handles (that will be passed to the runtime resolver).
const HELPERS = {
    increment: 0
};

// A map of components to their source code and the runtime handle (that will be passed
// to the runtime resolver).
const COMPONENTS = {
    FirstPage: {
        source: `<p>First Page: {{this.title}}</p>`,
        handle: 1,
        capabilities: CAPABILITIES
    },
    SecondPage: {
        source: `<p>Second Page: {{this.title}}</p>`,
        handle: 1,
        capabilities: CAPABILITIES
    }
};

export const RESOLVER_DELEGATE: any = {
    lookupComponent(name) {
        let component = COMPONENTS[name];
        if (component === null) return null;

        let { handle, source, capabilities } = component;
        console.log('lookup component');
        return {
            handle,
            compilable: Compilable(source),
            capabilities
        };
    },

    lookupHelper(name) {
        if (name in HELPERS) return HELPERS[name];
    }
};

export function Compilable(source): any {
    return Component(precompile(source));
}
