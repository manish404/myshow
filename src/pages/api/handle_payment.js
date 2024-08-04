import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const data = req.body;

    try {
        const response = await axios.post(process.env.KHALTI_API, data, {
            headers: {
                "Authorization": `Key ${process.env.KHALTI_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process the request', message: error.message });
    }
}