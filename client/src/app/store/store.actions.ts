import { State, Action, StateContext, Selector } from '@ngxs/store';

export class Increment {
  static readonly type = '[Counter] Increment';
}
export class Incrementby {
  static readonly type = '[Counter] Incrementby';
  constructor(public payload: number = 1) {}
}

export class Decrement {
  static readonly type = '[Counter] Decrement';
}

export class Reset {
  static readonly type = '[Counter] Reset';
}

@State<number>({
  name: 'counter',
  defaults: 0,
})
export class CounterState {
  @Action(Increment)
  increment(ctx: StateContext<number>) {
    const currentState = ctx.getState();
    ctx.setState(currentState + 1);
  }
  @Action(Incrementby)
  incrementby(ctx: StateContext<number>, { payload }: Incrementby) {
    const currentState = ctx.getState();
    ctx.setState(currentState + payload);
  }

  @Action(Decrement)
  decrement(ctx: StateContext<number>) {
    const currentState = ctx.getState();
    ctx.setState(currentState - 1);
  }

  @Action(Reset)
  reset(ctx: StateContext<number>) {
    ctx.setState(0);
  }
  @Selector()
  static getCounter(state: number) {
    return state;
  }
}
