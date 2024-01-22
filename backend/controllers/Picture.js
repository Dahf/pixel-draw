import picture from "../models/Picture.js";
import formidable from 'formidable';
import { promises as fs } from 'fs';


export const getPictures = async (req, res) => {
    try {
        const pictures = await picture.findAll({
            attributes: ['id', 'image', 'createdAt'],
        });
        const imagesData = await Promise.all(pictures.map(async (pic) => {
            return {
                id: pic.id,
                image: pic.image.toString('base64'), // Konvertieren des BLOB in einen Base64-String
                createdAt: pic.createdAt
            };
        }));
        res.json(imagesData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Serverfehler');
    }
};

export const getPicture = async(req, res) => {
    try {
        const selPicture = await picture.findByPk(req.params.id);
        if (selPicture) {
            const image = selPicture.image;
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': image.length
            });
            res.end(image); // Sendet das BLOB als Binärdaten
        } else {
            res.status(404).send('Bild nicht gefunden');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Serverfehler');
    }
}
export const deletePicture = async (req, res) => {
    try {
        await picture.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json("Message deleted");
    } catch (error) {
        console.log(error);
    }
}


export const createPicture = async(req, res) => {
    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Fehler beim Parsen der Formulardaten:', err);
            return res.status(500).json({ msg: "Serverfehler beim Parsen der Formulardaten" });
        }

        try {
            if (files.image) {
                // Hier wird angenommen, dass 'image' der Name des Feldes ist, das das Bild enthält
                const file = Array.isArray(files.image) ? files.image[0] : files.image;
                const data = await fs.readFile(file.filepath);
                await picture.create({
                    image: data, // Speichern Sie die Bilddaten direkt, da es bereits ein Blob ist
                    // Fügen Sie hier weitere Felder hinzu, falls erforderlich
                });
                await fs.unlink(file.filepath); // Löschen Sie die temporäre Datei
                res.json({ msg: "Bild erfolgreich erstellt" });
            } else {
                res.status(400).json({ msg: "Kein Bild zum Hochladen bereitgestellt" });
            }
        } catch (error) {
            console.error('Fehler beim Speichern des Bildes:', error);
            res.status(500).json({ msg: "Serverfehler beim Speichern des Bildes" });
        }
    });
}