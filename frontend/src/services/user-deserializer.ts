import type { User } from '../types/user';

interface JsonApiUserAttributes {
  first_name: string;
  last_name: string;
  email: string;
  role: 'librarian' | 'member';
}

interface JsonApiUserResource {
  id: string;
  type: 'user';
  attributes: JsonApiUserAttributes;
}

export interface JsonApiUserResponse {
  data: JsonApiUserResource;
}

export const deserializeUser = (response: JsonApiUserResponse): User => {
  const { id, attributes } = response.data;

  return {
    id: parseInt(id, 10),
    email: attributes.email,
    firstName: attributes.first_name,
    lastName: attributes.last_name,
    role: attributes.role,
  };
};
