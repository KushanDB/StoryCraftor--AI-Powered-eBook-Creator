// @desc    Generate content with AI
// @route   POST /api/ai/generate
// @access  Private
export const generateContent = async (req, res) => {
  try {
    const { prompt, type } = req.body; // type: 'title', 'chapter', 'description'

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        message: 'AI API key not configured' 
      });
    }

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.candidates && data.candidates[0]) {
      const generatedText = data.candidates[0].content.parts[0].text;
      res.json({ content: generatedText });
    } else {
      res.status(500).json({ message: 'Failed to generate content' });
    }
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate chapter outline
// @route   POST /api/ai/outline
// @access  Private
export const generateOutline = async (req, res) => {
  try {
    const { title, genre, numberOfChapters } = req.body;

    const prompt = `Create a detailed ${numberOfChapters}-chapter outline for an eBook titled "${title}" in the ${genre} genre. 
    For each chapter, provide:
    1. Chapter number and title
    2. Brief summary (2-3 sentences)
    
    Format as a numbered list.`;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        message: 'AI API key not configured' 
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.candidates && data.candidates[0]) {
      const outline = data.candidates[0].content.parts[0].text;
      res.json({ outline });
    } else {
      res.status(500).json({ message: 'Failed to generate outline' });
    }
  } catch (error) {
    console.error('AI Generation Error:', error);
    res.status(500).json({ message: error.message });
  }
};