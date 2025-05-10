import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"

// Create a SQL client with the connection string
const sql = neon(process.env.DATABASE_URL!)

// Helper functions for database operations
export const db = {
  // User operations
  users: {
    async findByEmail(email: string) {
      const result = await sql`
        SELECT * FROM users WHERE email = ${email} LIMIT 1
      `
      return result[0] || null
    },

    async create({ name, email, password, institution, role = "student" }: any) {
      const hashedPassword = await bcrypt.hash(password, 10)
      const result = await sql`
        INSERT INTO users (name, email, password, institution, role)
        VALUES (${name}, ${email}, ${hashedPassword}, ${institution}, ${role})
        RETURNING id, name, email, institution, role, created_at
      `
      return result[0]
    },

    async verifyPassword(user: any, password: string) {
      return bcrypt.compare(password, user.password)
    },
  },

  // Form operations
  forms: {
    async create({ userId, formType, formData }: any) {
      const result = await sql`
        INSERT INTO forms (user_id, form_type, form_data)
        VALUES (${userId}, ${formType}, ${JSON.stringify(formData)})
        RETURNING id, user_id, form_type, status, created_at
      `
      return result[0]
    },

    async findByUserId(userId: number) {
      return sql`
        SELECT * FROM forms WHERE user_id = ${userId}
        ORDER BY created_at DESC
      `
    },

    async findAll(limit = 100, offset = 0) {
      return sql`
        SELECT f.*, u.name, u.email 
        FROM forms f
        JOIN users u ON f.user_id = u.id
        ORDER BY f.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    },

    async updateStatus(formId: number, status: string) {
      return sql`
        UPDATE forms 
        SET status = ${status}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${formId}
        RETURNING *
      `
    },
  },

  // Form visibility operations
  formVisibility: {
    async getAll() {
      return sql`SELECT * FROM form_visibility`
    },

    async update(formType: string, visible: boolean, session?: string, deadline?: Date) {
      return sql`
        UPDATE form_visibility
        SET 
          visible = ${visible}, 
          session = COALESCE(${session}, session),
          deadline = COALESCE(${deadline}, deadline),
          updated_at = CURRENT_TIMESTAMP
        WHERE form_type = ${formType}
        RETURNING *
      `
    },
  },

  // Admin operations
  admin: {
    async getStats() {
      const userCount = await sql`SELECT COUNT(*) FROM users WHERE role = 'student'`
      const formCount = await sql`SELECT COUNT(*) FROM forms`
      const pendingCount = await sql`SELECT COUNT(*) FROM forms WHERE status = 'pending'`

      return {
        userCount: Number.parseInt(userCount[0].count),
        formCount: Number.parseInt(formCount[0].count),
        pendingCount: Number.parseInt(pendingCount[0].count),
      }
    },

    async getRecentForms(limit = 5) {
      return sql`
        SELECT f.*, u.name, u.email 
        FROM forms f
        JOIN users u ON f.user_id = u.id
        ORDER BY f.created_at DESC
        LIMIT ${limit}
      `
    },
  },
}

export default sql
