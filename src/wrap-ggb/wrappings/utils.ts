import { AppApi } from "../../shared/appApi";
import { augmentedGgbApi } from "../shared";
import { SkulptApi } from "../../shared/vendor-types/skulptapi";

declare var Sk: SkulptApi;

export const register = (mod: any, appApi: AppApi) => {
  const ggb = augmentedGgbApi(appApi.ggb);

  const cmd = new Sk.builtin.func((command) => {
    if (!Sk.builtin.checkString(command)) {
      console.error(command);
      throw new Sk.builtin.TypeError("Command must be a string");
    }
  //   const result : boolean = ggb.evalCommand(command.v);
  //   return ggb.wrapExistingGgbObject(result?"true" : "false");
  // });
    
    // try {
      const results = ggb.evalCmdMultiple(command.v);

      if (typeof results === "string") {
        // Handle concatenated labels (e.g., "E,F")
        if (results.includes(",")) {
          results = results.split(",").map(label => label.trim());
        } else {
          // Single label, return it as an array
          results = [results];
        }
      }
      return results.map(result => {
        try {
          return ggb.wrapExistingGgbObject( result )

        } catch(err) {
          console.log(err);
          return ggb.wrapExistingGgbObject( "false" )
        }
      }
      )
    // } catch(err) {
    //   return ggb.wrapExistingGgbObject("false");
    // }
  });

  mod.Cmd = cmd;
};
