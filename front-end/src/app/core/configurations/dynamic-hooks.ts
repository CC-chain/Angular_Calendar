
import { OutletOptions } from 'ngx-dynamic-hooks';
export const options : OutletOptions =
   {
    convertHTMLEntities : true,
    fixParagraphTags : true,
    updateOnPushOnly : true,
    compareInputsByValue : false,
    sanitize : false,
    compareOutputsByValue : false,
    compareByValueDepth : 5,
    ignoreInputAliases : false,
    ignoreOutputAliases : false,
    acceptInputsForAnyProperty : false,
    acceptOutputsForAnyObservable : false,
  }
