import express from "express";
import { createPicture, deletePicture, getPicture, getPictures } from "../controllers/Picture.js";


const router = express.Router();


router.post('/picture/post', createPicture);
router.get('/picture/delete/:id',  deletePicture);
router.get('/pictures',  getPictures);
router.get('/picture/:id',  getPicture);

export default router;