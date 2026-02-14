export async function POST(request) {
  console.log('=== TRAVEL RECOMMENDATION API ===');
  
  try {
    const { place } = await request.json();
    console.log('Requested place:', place);

    if (!place) {
      return Response.json({ error: 'Place is required' }, { status: 400 });
    }

    // Check if API keys exist
    if (!process.env.DEEPSEEK_API_KEY || !process.env.UNSPLASH_ACCESS_KEY) {
      console.log('❌ API keys missing from environment');
      return Response.json({ error: 'API configuration error' }, { status: 500 });
    }

    console.log('✅ Making requests to OpenRouter and Unsplash...');

    
    const [recommendationResponse, imagesResponse] = await Promise.all([
      
      fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Travel Bot'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are a helpful travel assistant. Provide structured travel recommendations with clear sections. Format your response like this:

**Top Attractions:**
- Place 1: Brief description
- Place 2: Brief description

**Local Foods:**
- Food 1: Description
- Food 2: Description

**Best Time to Visit:**
Month to Month description

**Travel Tips:**
- Tip 1
- Tip 2

Keep each section concise and use bullet points.`
            },
            {
              role: 'user',
              content: `Provide travel recommendations for ${place}`
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      }),

      // Get images from Unsplash
      fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(place + ' travel')}&per_page=6&orientation=landscape`, {
        headers: {
          'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
        }
      })
    ]);

    console.log('OpenRouter response status:', recommendationResponse.status);
    console.log('Unsplash response status:', imagesResponse.status);

    // Handle recommendation response
    if (!recommendationResponse.ok) {
      const errorText = await recommendationResponse.text();
      console.log('OpenRouter error:', errorText);
      throw new Error(`OpenRouter API error: ${recommendationResponse.status}`);
    }

    const recommendationData = await recommendationResponse.json();
    const recommendation = recommendationData.choices[0].message.content;

    // Handle images response
    let images = [];
    if (imagesResponse.ok) {
      const imagesData = await imagesResponse.json();
      images = imagesData.results || [];
      console.log(`✅ Found ${images.length} images`);
    } else {
      console.log('⚠️ Could not fetch images, continuing without them');
    }

    return Response.json({ 
      recommendation, 
      images 
    });

  } catch (error) {
    console.log('❌ Final error:', error.message);
    return Response.json(
      { error: 'Failed to get travel recommendations: ' + error.message },
      { status: 500 }
    );
  }
}