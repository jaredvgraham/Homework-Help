import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import connectToDatabase from "./lib/mongodb";
import User from "./models/UserModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name,
          role: "solo",
        }); // Default role
      }
      const userWithSchool = await User.findOne({ email: user.email }).populate(
        "school"
      );

      if (!userWithSchool.school) {
        // Redirect to the role selection page if they are not associated with a school
        return "/choose-role"; // Route where user can choose to register a school or be solo
      }

      return true;
    },
    async session({ session, user, token }) {
      await connectToDatabase();
      const dbUser = await User.findOne({ email: session.user.email });
      if (session.user) {
        (session.user as any).role = dbUser?.role ?? "solo";
      }
      return session;
    },
  },
});
