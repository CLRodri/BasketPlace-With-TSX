import * as express from "express";
import * as cors from "cors";
import * as Database from "better-sqlite3";
import * as jwt from "jsonwebtoken"; 
import { Request, Response } from "express";
// Inicializa Express
const app = express();
app.use(express.json());
app.use(cors());

// Conectar a SQLite3
const db = new Database("database.db", { verbose: console.log });

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fechaNacimiento TEXT NOT NULL
  )
`);

const SECRET_KEY='secretkey';
app.post("/api/register", (req, res) => {
  const { nombre, apellido, email, password, fechaNacimiento } = req.body;
  try {
    const stmt = db.prepare(
      `INSERT INTO users (nombre, apellido, email, password, fechaNacimiento) VALUES (?, ?, ?, ?, ?)`
    );
    stmt.run(nombre, apellido, email, password, fechaNacimiento);
    res.json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  try {
    const stmt = db.prepare(`SELECT * FROM users WHERE email = ? AND password = ?`);
    const user = stmt.get(email, password);
    
    if (user) {

      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

      res.json({ ...user, token })
    } else {
      res.status(404).json("Usuario o contraseña incorrectos");
    }
  } catch (error) {
    res.status(500).json("Usuario o contraseña incorrectos");
  }
}); 



app.post("/api/profile", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificar el token
    const decoded: any = jwt.verify(token, SECRET_KEY);

    // Buscar al usuario en la base de datos usando el ID del token
    const stmt = db.prepare(`SELECT id, nombre, apellido, email, fechaNacimiento FROM users WHERE email = ? and password = ?`);
    const user = stmt.get(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
    return user;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token inválido o expirado" });
  }
});
  
// Iniciar servidor en el puerto 5000
app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});