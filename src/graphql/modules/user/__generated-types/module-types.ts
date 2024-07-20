import * as Types from "../../../__generated-types/graphql";
import * as gm from "graphql-modules";
export namespace UserModule {
  interface DefinedFields {
    Query: 'getUser';
    Mutation: 'checkUsernameIsAvailable';
    User: 'id' | 'email' | 'username' | 'registrationCompleted' | 'avatar';
    UsernameAvailability: 'isAvailable';
  };
  
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type UsernameAvailability = Pick<Types.UsernameAvailability, DefinedFields['UsernameAvailability']>;
  
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  export type UsernameAvailabilityResolvers = Pick<Types.UsernameAvailabilityResolvers, DefinedFields['UsernameAvailability'] | '__isTypeOf'>;
  
  export interface Resolvers {
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    User?: UserResolvers;
    UsernameAvailability?: UsernameAvailabilityResolvers;
  };
  
  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      getUser?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      checkUsernameIsAvailable?: gm.Middleware[];
    };
    User?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      email?: gm.Middleware[];
      username?: gm.Middleware[];
      registrationCompleted?: gm.Middleware[];
      avatar?: gm.Middleware[];
    };
    UsernameAvailability?: {
      '*'?: gm.Middleware[];
      isAvailable?: gm.Middleware[];
    };
  };
}