import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: {
          type: "text",
          placeholder: "username",
        },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const user = { id: 1, name: "Admin", password: "admin123" };

        if (
          user.name == credentials.username &&
          user.password == credentials.password
        ) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin-panel/signin",
  },
  site: process.env.NEXTAUTH_URL,
};

export default (req, res) => NextAuth(req, res, options);
