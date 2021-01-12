import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {
          // label: "Użytkownik",
          type: "text",
          placeholder: "username",
        },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 1, name: "Admin", password: "1klarnet1" };

        if (
          user.name == credentials.username &&
          user.password == credentials.password
        ) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null);
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin-panel/signin",
  },
  site: process.env.NEXTAUTH_URL,
  // A database is optional, but required to persist accounts in a database
  //   database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
