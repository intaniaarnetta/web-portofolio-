// backend/migrate.js
import pool from './db.js';
import bcrypt from 'bcrypt';

const runMigration = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY, 
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(10) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    const checkAdmin = await pool.query("SELECT 1 FROM users WHERE username='admin'");
    if (!checkAdmin.rows.length) {
      const hashedPassword = await bcrypt.hash('admin123', 10); // 🔒 hash password admin
      await pool.query(
        `INSERT INTO users (username, password, role) VALUES ($1, $2, $3);`,
        ['admin', hashedPassword, 'admin']
      );
      console.log('✅ Default admin dibuat: username=admin | password=admin123');
    } else {
      console.log('ℹ️ Admin sudah ada, skip pembuatan admin default');
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        tools TEXT[],
        images TEXT[],
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name='projects' AND column_name='tools'
        ) THEN
          ALTER TABLE projects ADD COLUMN tools TEXT[];
        END IF;

        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name='projects' AND column_name='images'
        ) THEN
          ALTER TABLE projects ADD COLUMN images TEXT[];
        END IF;
      END
      $$;
    `);

    console.log('✅ Migration berhasil: tabel users, projects, & settings siap!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration error:', err);
    process.exit(1);
  }
};

runMigration();
