import Component, { CAPABILITIES } from '@glimmer/component';
import { map } from '@glimmer/reference';
import { tracked } from '@glimmer/tracking';

import NativeComponentManager from './native-component-manager';

class FirstPage extends Component {
    title: string = 'First Page';
    didInsertElement() {
        debugger;
        this.title = 'Heard it both ways';
    }
}
tracked(FirstPage.prototype, 'title');

class SecondPage extends Component {
    title: string = 'Second Page';
    didInsertElement() {
        debugger;
        this.title = 'Heard it both ways';
    }
}
tracked(FirstPage.prototype, 'title');

let manager = new NativeComponentManager();
// prettier-ignore
const TABLE = [
  // handle 0 is the increment helper
  args => map(args.positional.at(0), (i: number) => i + 1),

  {
      name: "FirstPage",
      manager,
      ComponentClass: FirstPage,
      handle: 1,
      state: {
          name: "FirstPage",
          capabilities: CAPABILITIES,
          ComponentClass: FirstPage,
          handle: 1
      }
    },
    {
        name: "SecondPage",
        manager,
        ComponentClass: SecondPage,
        handle: 1,
        state: {
            name: "SecondPage",
            capabilities: CAPABILITIES,
            ComponentClass: SecondPage,
            handle: 1
        }
    }

];

export const RUNTIME_RESOLVER: any = {
    resolve(handle) {
        if (handle < TABLE.length) {
            return TABLE[handle];
        } else {
            return null;
        }
    }
};
