export async function POST(req) {
  try {
    const { message, tier, sessionId } = await req.json();

    if (!message) {
      return Response.json({ error: "No message" }, { status: 400 });
    }

    let systemPrompt = "";

    if (tier === "pro") {
      systemPrompt = `
You are an elite dropshipping strategist.
Give very detailed answers with steps, tools, examples, product ideas, pricing and ads.
`;
    } 
    else if (tier === "starter") {
      systemPrompt = `
You are a helpful dropshipping coach.
Give clear explanation, 4-6 steps, tools and examples.
`;
    } 
    else {
      systemPrompt = `
You are a simple dropshipping assistant.
Give short explanation, tips and simple steps.
`;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    return Response.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
