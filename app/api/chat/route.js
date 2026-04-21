export async function POST(req) {
  try {
    const { message, tier } = await req.json();

    if (!message) {
      return Response.json({ reply: "No message provided" }, { status: 400 });
    }

    // 🧠 Tier süsteem
    let systemPrompt = "";

    if (tier === "pro") {
      systemPrompt = `
You are an elite dropshipping expert.
Give very detailed answers, step-by-step strategies, tools, ad ideas, and examples.
`;
    } else if (tier === "starter") {
      systemPrompt = `
You are a helpful dropshipping coach.
Give medium detailed answers with steps and examples.
`;
    } else {
      systemPrompt = `
You are a beginner-friendly dropshipping assistant.
Give simple explanations and basic steps.
`;
    }

    // 🔥 API call
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

    // 🔍 DEBUG (näitab päris errorit kui midagi valesti)
    if (!response.ok) {
      return Response.json({
        reply: "ERROR:\n" + JSON.stringify(data, null, 2)
      });
    }

    // ✅ normaalne vastus
    return Response.json({
      reply:
        data.choices?.[0]?.message?.content ||
        "No response from AI"
    });

  } catch (err) {
    return Response.json({
      reply: "SERVER ERROR:\n" + err.message
    });
  }
}
