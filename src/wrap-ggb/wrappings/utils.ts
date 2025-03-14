import { AppApi } from "../../shared/appApi";
import { augmentedGgbApi, SkGgbObject } from "../shared";
import { SkulptApi } from "../../shared/vendor-types/skulptapi";
import { NULL } from "sass";

declare var Sk: SkulptApi;

export const register = (mod: any, appApi: AppApi) => {
  const ggb = augmentedGgbApi(appApi.ggb);

  const cmd = new Sk.builtin.func((command) => {
    if (!Sk.builtin.checkString(command)) {
      console.error(command);
      throw new Sk.builtin.TypeError("Command must be a string");
    }
    const result:string = ggb.evalCmd(command.v);
    console.log(command.v, result);
    if (result.indexOf(",") > -1) {
      return ggb.wrapExistingGgbObject(result.split(',')[0].trim());
    }
    if (!result) {
      return ggb.wrapExistingGgbObject(ggb.evalCmd("false"));
    } else {
      try {
        return ggb.wrapExistingGgbObject(result);
      } catch(err) {
        console.log(err);
        return ggb.wrapExistingGgbObject(ggb.evalCmd("false"));
      }

    }
    /*return ggb.wrapExistingGgbObject(ggb.evalCmd(result?"true" : "false"));*/
  });
    
 /*    try {
      let results = ggb.evalCommandGetLabels(command.v);
      let res : string[] = []
      if (typeof results === "string") {
        // Handle concatenated labels (e.g., "E,F")
        if (results.includes(",")) {
          res = results.split(",").map(label => label.trim());
        } else {
          // Single label, return it as an array
          res = [results];
        }
      } else if (Array.isArray(results)) {
        res = results
      }
      if (res.length) {
        return res.map(result => {
          try {
            return ggb.wrapExistingGgbObject( result )
  
          } catch(err) {
            console.log(err);
            return ggb.wrapExistingGgbObject( "false" )
          }
        })
      } else {
        console.log("Result of command '" + command.v + "'is empty")
        return ggb.wrapExistingGgbObject("false");

      }
    } catch(err) {
      console.log("Error for command '" + command.v + "'", err)
      return ggb.wrapExistingGgbObject("false");
    }
  }); */

  mod.Cmd = cmd;
};
