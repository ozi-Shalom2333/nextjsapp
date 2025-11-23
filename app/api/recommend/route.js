export async function POST(request) {
  console.log('=== USING OPENROUTER API ===');
  
  try {
    const { place } = await request.json();
    console.log('Requested place:', place);

    if (!place) {
      return Response.json({ error: 'Place is required' }, { status: 400 });
    }

    // Check if API key exists
    if (!process.env.DEEPSEEK_API_KEY) {
      console.log('❌ API key missing from environment');
      return Response.json({ error: 'API configuration error' }, { status: 500 });
    }

    console.log('✅ Making request to OpenRouter...');

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Travel Bot'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat', // Using DeepSeek model through OpenRouter
        messages: [
          {
            role: 'system',
            content: 'You are a helpful travel assistant. Provide concise travel recommendations with top attractions, local foods, best time to visit, and practical tips. Keep it under 200 words.'
          },
          {
            role: 'user',
            content: `Provide travel recommendations for ${place}`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    console.log('OpenRouter response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('OpenRouter error:', errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ OpenRouter success!');
    
    const recommendation = data.choices[0].message.content;
    return Response.json({ recommendation });

  } catch (error) {
    console.log('❌ Final error:', error.message);
    return Response.json(
      { error: 'Failed to get recommendations: ' + error.message },
      { status: 500 }
    );
  }
}