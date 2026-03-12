export interface IAzureAuthUser {
  email?: string;
  image?: string;
  name?: string;
}

export interface IAzureAuth {
  accessToken?: string;
  expires?: string;
  user?: IAzureAuthUser;
}
