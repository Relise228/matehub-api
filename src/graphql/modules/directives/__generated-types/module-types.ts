import * as Types from "../../../__generated-types/graphql";
import * as gm from "graphql-modules";
export namespace DirectivesModule {
  interface DefinedEnumValues {
    AccessKey: 'USER';
  };
  
  export type AccessKey = DefinedEnumValues['AccessKey'];
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
  };
}