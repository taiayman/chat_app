// src/auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent select_account",
          access_type: "offline",
        },
      },
    }),
  ],
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Log to help debug
      console.log('User signing in:', {
        userId: user.id,
        email: user.email,
        image: user.image,
        profileImage: profile?.image
      })
      return true
    },
    async session({ session, user }) {
      // Add the user ID and profile data to the session
      if (session.user) {
        session.user.id = user.id
        session.user.image = user.image
        session.user.name = user.name
        session.user.email = user.email
      }
      return session
    }
  }
})
