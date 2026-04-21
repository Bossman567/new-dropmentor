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
Give very detailed answers with step-by-step strategies, tools, examples, pricing, and ad ideas.
`;
    } 
    else if (tier === "starter") {
      systemPrompt = `
You are a helpful dropshipping coach.
Give medium detailed answers with steps, tools and simple examples.
`;
    } 
    else {
      systemPrompt = `
You are a beginner-friendly dropshipping assistant.
Give simple explanations, tips and basic steps.
`;
    }

    // 🔥 OpenAI call
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

    // 🔍 kui API error
    if (!response.ok) {
      return Response.json({
        reply: "ERROR:\n" + JSON.stringify(data, null, 2)
      });
    }

    // ✨ tekst puhastamine
    function cleanText(text) {
      return text
        // eemalda * ja -
        .replace(/^\s*[\*\-]\s+/gm, "")
        // eemalda liigsed tühjad read
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    }

    const rawReply =
      data.choices?.[0]?.message?.content || "No response";

    const cleanedReply = cleanText(rawReply);

    return Response.json({
      reply: cleanedReply
    });

  } catch (err) {
    return Response.json({
      reply: "SERVER ERROR:\n" + err.message
    });
  }
}
