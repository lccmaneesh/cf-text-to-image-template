export default {
  async fetch(request, env) {
    const { searchParams } = new URL(request.url);
    const prompt = searchParams.get("prompt");

    // If no prompt is provided, return an HTML page with a text input and button
    if (!prompt) {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Generate AI Image</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            input[type="text"] {
              width: 300px;
              padding: 0.5rem;
              margin-right: 0.5rem;
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 1rem;
            }
            button {
              padding: 0.6rem 1rem;
              font-size: 1rem;
              background: #0070f3;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            button:hover {
              background: #005bcc;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Generate an AI Image</h1>
            <form method="GET">
              <input
                type="text"
                name="prompt"
                placeholder="Enter your prompt here"
                required
              />
              <button type="submit">Generate Image</button>
            </form>
          </div>
        </body>
        </html>
      `;
      return new Response(html, {
        headers: { "content-type": "text/html; charset=UTF-8" },
      });
    }

    // If a prompt is provided, call the AI binding to generate an image
    const inputs = { prompt };
    const aiResponse = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs
    );

    return new Response(aiResponse, {
      headers: { "content-type": "image/png" },
    });
  },
} satisfies ExportedHandler<Env>;
