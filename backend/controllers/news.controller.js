/**
 * Tech Hub — News Controller
 * Handles fetching news from NewsData API.
 */

const getNews = async (req, res) => {
  try {
    const apiKey = process.env.NEWSDATA_API_KEY;
    if (!apiKey || apiKey === 'YOUR_NEWSDATA_API_KEY_HERE') {
      return res.status(500).json({
        success: false,
        message: 'API Key de NewsData no configurada en el servidor.',
      });
    }

    // Fetch news related to technology
    const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${apiKey}&q=technology&language=es`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.results?.message || `Error en NewsData API: ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json({
      success: true,
      count: data.totalResults,
      data: data.results, // Contains array of articles
    });
  } catch (error) {
    console.error('❌ Error in getNews:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al obtener noticias. ' + error.message,
    });
  }
};

module.exports = { getNews };
