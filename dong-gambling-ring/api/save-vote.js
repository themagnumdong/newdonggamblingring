
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const filePath = path.join(process.cwd(), 'public', 'voters.json');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const currentVotes = JSON.parse(data);
    currentVotes.push(req.body);
    await fs.writeFile(filePath, JSON.stringify(currentVotes, null, 2));
    res.status(200).json({ message: 'Vote saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save vote' });
  }
}
