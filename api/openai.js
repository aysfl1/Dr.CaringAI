export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // No REACT_APP_ prefix

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not set in environment variables.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
