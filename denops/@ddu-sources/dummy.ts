import {
  BaseSource,
  Item,
} from "https://deno.land/x/ddu_vim@v3.2.4/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v3.2.4/deps.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.5.0/file.ts";

type Params = {
  word: string;
  display: string;
}

export class Source extends BaseSource<Params> {
  override gather(args: {
    denops: Denops;
    sourceParams: Params;
  }): ReadableStream<Item<ActionData>[]> {
    const word = args.sourceParams.word;
    const display = args.sourceParams.display;
    return new ReadableStream({
      start(controller) {
        controller.enqueue([{
          word,
          display: display !== "" ? display : word,
        }]);

        controller.close();
      },
    });
  }

  override params(): Params {
    return {
      word: "",
      display: "",
    };
  }
}
