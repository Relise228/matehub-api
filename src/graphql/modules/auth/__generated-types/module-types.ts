import * as Types from "../../../__generated-types/graphql";
import * as gm from "graphql-modules";
export namespace AuthModule {
  interface DefinedFields {
    Mutation: 'signup' | 'login';
    TokenData: 'token';
  };
  
  interface DefinedInputFields {
    SignUpInput: 'username' | 'email' | 'password' | 'confirmPassword';
  };
  
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type TokenData = Pick<Types.TokenData, DefinedFields['TokenData']>;
  export type SignUpInput = Pick<Types.SignUpInput, DefinedInputFields['SignUpInput']>;
  
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type TokenDataResolvers = Pick<Types.TokenDataResolvers, DefinedFields['TokenData'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Mutation?: MutationResolvers;
    TokenData?: TokenDataResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      signup?: gm.Middleware[];
      login?: gm.Middleware[];
    };
    TokenData?: {
      '*'?: gm.Middleware[];
      token?: gm.Middleware[];
    };
  };
}