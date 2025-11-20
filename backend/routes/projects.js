import express from 'express';
import pool from '../db.js';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// Setup folder upload
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET all projects
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    res.json(result.rows.map(p => ({
      ...p,
      tools: p.tools || [],
      images: p.images || []
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project tidak ditemukan' });
    }

    const project = result.rows[0];
    res.json({
      ...project,
      tools: project.tools || [],
      images: project.images || [],
    });
  } catch (err) {
    console.error("GET /projects/:id error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create project
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const { title, description, tools } = req.body;
    // map file upload ke array string path
    const images = req.files?.map(f => `/${f.path.replace(/\\/g, '/')}`) || [];
    const toolsArray = tools ? tools.split(',').map(t => t.trim()).filter(t => t) : [];

    const result = await pool.query(
      'INSERT INTO projects (title, description, tools, images) VALUES ($1,$2,$3,$4) RETURNING *',
      [title, description, toolsArray, images]
    );

    res.status(201).json({
      ...result.rows[0],
      tools: result.rows[0].tools || [],
      images: result.rows[0].images || []
    });
  } catch (err) {
    console.error("POST /projects error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update project
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const { title, description, tools, existingImages } = req.body;
    const toolsArray = tools ? tools.split(',').map(t => t.trim()).filter(t => t) : [];

    const oldProject = await pool.query('SELECT * FROM projects WHERE id=$1', [req.params.id]);
    if (!oldProject.rows.length) return res.status(404).json({ message: 'Project not found' });

    let retainedImages = [];
    if (existingImages) {
      try {
        retainedImages = JSON.parse(existingImages);
      } catch (err) {
        console.warn("Failed to parse existingImages:", err);
      }
    } else {
      retainedImages = oldProject.rows[0].images || [];
    }

    const newImages = req.files?.map(f => `/${f.path.replace(/\\/g, '/')}`) || [];

    const finalImages = [...retainedImages, ...newImages];

    const result = await pool.query(
      'UPDATE projects SET title=$1, description=$2, tools=$3, images=$4, updated_at=NOW() WHERE id=$5 RETURNING *',
      [title, description, toolsArray, finalImages, req.params.id]
    );

    res.json({
      ...result.rows[0],
      tools: result.rows[0].tools || [],
      images: result.rows[0].images || []
    });
  } catch (err) {
    console.error("PUT /projects/:id error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ message: "Invalid project ID" });

  try {
    const result = await pool.query('DELETE FROM projects WHERE id=$1 RETURNING *', [id]);
    if (!result.rows.length) return res.status(404).json({ message: 'Project not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DELETE /projects/:id error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
