import * as express from "express";
import * as cors from "cors";
import * as Database from "better-sqlite3";

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
      res.json(user);
    } else {
      res.status(404).json("Usuario o contraseña incorrectos");
    }
  } catch (error) {
    res.status(500).json("Usuario o contraseña incorrectos");
  }
}); 
// Iniciar servidor en el puerto 5000
app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});