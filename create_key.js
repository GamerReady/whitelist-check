const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { item: hwid } = req.body;
        
        if (!hwid) {
            return res.status(400).json({ message: 'Error: hwid es requerido.' });
        }
        
        const filePath = path.join(process.cwd(), 'proyecto.json');
        
        fs.appendFile(filePath, `${hwid}\n`, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al guardar el archivo.' });
            }
            return res.status(200).json({ message: 'Autorizado' });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed xd`);
    }
}
