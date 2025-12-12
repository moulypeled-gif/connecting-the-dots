// server.js - גרסת ESM שמתאימה ל-"type": "module"

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import path from "node:path";
import { fileURLToPath } from "node:url";

// כי ב-ESM אין __dirname ו-__filename מובנים:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "CHANGE_ME_IN_PRODUCTION";

// רשימת אדמינים (מנהל/ים) – מומלץ להגדיר ב-ENV בענן
const ADMINS = [
  {
    username: process.env.ADMIN_USER1 || "admin1",
    password: process.env.ADMIN_PASS1 || "password1",
  },
  {
    username: process.env.ADMIN_USER2 || "admin2",
    password: process.env.ADMIN_PASS2 || "password2",
  },
];
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(express.json());
app.use(cors());

// API לכניסה
app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "חובה לספק שם משתמש וסיסמה." });
  }

  const admin = ADMINS.find(
    (u) => u.username === username && u.password === password
  );

  if (!admin) {
    return res.status(401).json({ error: "שם משתמש או סיסמה שגויים." });
  }

  const token = jwt.sign(
    { username: admin.username, role: "admin" },
    JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.json({ token });
});

// הגשה סטטית של ה-build של Vite (dist)
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
app.get("/api/contacts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts ORDER BY last_name, first_name;");
    res.json(result.rows);
  } catch (err) {
    console.error("Error reading contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

