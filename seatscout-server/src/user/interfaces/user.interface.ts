export interface User {
  name: string;
  email: string;
  avatar: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}
