import express from "express";
import pg from "pg";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

app.use(cors());

const port = 3000;

dotenv.config();

app.use(express.json());

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", async (req, res) => {
  res.send("helloo from online");
});

app.get("/test", async (req, res) => {
  const q = await pool.query("SELECT * from users");
  res.send(q);
});

app.post("/api/auth/register", async (req, res) => {
  const { email, nickname, password } = req.body;

  if (!email || !password || !nickname)
    return res.status(400).send({ error: "Invalid request" });

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password, nickname) VALUES ($1, $2, $3)",
      [email, encryptedPassword, nickname]
    );

    return res.send({ info: "User succesfully created" });
  } catch (err) {
    console.log(err);

    return res.status(500).send({ error: "Internal server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send({ error: "Invalid request" });

  const q = await pool.query(
    "SELECT password, id, nickname from users WHERE email=$1",
    [email]
  );

  if (q.rowCount === 0) {
    return res.status(404).send({ error: "This user does not exist" });
  }

  const result = q.rows[0];
  const match = await bcrypt.compare(password, result.password);

  if (!match) {
    return res.status(403).send({ error: "Wrong password" });
  }

  try {
    const token = await JWT.sign(
      { id: result.id, nickname: result.nickname, email },
      process.env.JWT_SECRET,
      {
        algorithm: "HS512",
        expiresIn: "1h",
      }
    );
    const user_id = q.rows[0].id;
    return res.json({ message: "Login successful !!", token, user_id });
    //return res.send({ token })
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Cannot generate token" });
  }
});

app.use(async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send("Unauthorized");

  try {
    const decoded = await JWT.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );

    if (decoded !== undefined) {
      req.user = decoded;
      return next();
    }
  } catch (err) {
    console.log(err);
  }

  return res.status(403).send("Invalid token");
});

app.post("/api/lobby", async (req, res) => {
  const { lobby_name } = req.body;

  pool.query(
    "INSERT INTO lobby (lobby_name, user_id) VALUES ($1, $2)",
    [lobby_name, req.user.id],
    (error, results) => {
      if (error) {
        res.json({ err: error });
      } else {
        res.json({ msg: "Lobby has been created" });
      }
      console.log(req.user.id);
    }
  );
});

app.get("/api/lobby", async (req, res) => {
  const lobbies = await pool.query("SELECT * FROM lobby");
  res.send(lobbies.rows);
});

app.get("/api/messages/:lobbyId", async (req, res) => {
  const { lobbyId } = req.params;

  try {
    const messages = await pool.query(
      "SELECT messages.*, users.nickname FROM messages INNER JOIN users ON messages.user_id = users.id WHERE messages.lobby_id = $1",
      [lobbyId]
    );
    res.json(messages.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(`/api/messages/new/:lobbyId`, async (req, res) => {
  const { lobbyId } = req.params;
  const { content, user_id } = req.body;
  pool.query(
    "INSERT INTO messages (content, user_id, lobby_id) VALUES ($1, $2, $3)",
    [content, user_id, lobbyId],
    (error, results) => {
      if (error) {
        res.json({ err: error });
      } else {
        res.json({ msg: "message has been sent" });
      }
    }
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}`);
});
