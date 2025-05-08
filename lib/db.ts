// Simple in-memory database
const users = [
  {
    id: "1",
    email: "admin@example.com",
    password: "password123", // In production, this would be hashed
    name: "Admin User",
  },
  {
    id: "2",
    email: "niosdiscussion@gmail.com",
    password: "admin123", // In production, this would be hashed
    name: "NIOS Admin",
  },
]

const registrations = []
const formSubmissions = []
const urgentQueries = []

export const db = {
  user: {
    findUnique: async ({ where }) => {
      return users.find((user) => user.email === where.email) || null
    },
    create: async ({ data }) => {
      const newUser = {
        id: String(users.length + 1),
        ...data,
      }
      users.push(newUser)
      return newUser
    },
  },
  registration: {
    create: async ({ data }) => {
      const newRegistration = {
        id: String(registrations.length + 1),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      registrations.push(newRegistration)
      return newRegistration
    },
    findMany: async ({ where }) => {
      return registrations.filter((reg) => reg.userId === where.userId)
    },
  },
  formSubmission: {
    create: async ({ data }) => {
      const newSubmission = {
        id: String(formSubmissions.length + 1),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      formSubmissions.push(newSubmission)
      return newSubmission
    },
  },
  urgentQuery: {
    create: async ({ data }) => {
      const newQuery = {
        id: String(urgentQueries.length + 1),
        ...data,
        timestamp: new Date(),
        resolved: false,
      }
      urgentQueries.push(newQuery)
      return newQuery
    },
  },
}

export default db
