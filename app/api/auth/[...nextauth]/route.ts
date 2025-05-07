import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

// Simple function to validate credentials without bcrypt
function validateCredentials(credentials) {
  // In a real app, you would check against a database
  // This is just a placeholder implementation
  const validEmail = "admin@example.com"
  const validPassword = "password123"

  return credentials.email === validEmail && credentials.password === validPassword
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null

        // Validate credentials without using bcrypt
        const isValid = validateCredentials(credentials)

        if (isValid) {
          return {
            id: "1",
            name: "Admin User",
            email: credentials.email,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session }) {
      return session
    },
  },
})

export { handler as GET, handler as POST }
