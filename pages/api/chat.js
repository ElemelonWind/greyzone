import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Turn this into a google search query:\n\n" + message + "\n\nDon't include quotations or special characters." }],
      model: "gpt-3.5-turbo",
    });

    const searchQuery = completion.choices[0].message.content;
    // console.log(searchQuery)
    // const searchQuery = "Who are Arizona's representatives"

    const response = await fetch(`https://customsearch.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(searchQuery)}&num=5`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      res.status(500).json({ message: 'Answer not found' });
      return;
    }

    const data = await response.json();

    console.log(data)

    let summary;

    for (let i = 0; i < data.items.length; i++) {
      const url = data.items[i].link;

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_AI21_API_KEY
        },
        body: JSON.stringify({
          sourceType: 'URL',
          source: url,
        })
      };
      
      summary = await fetch('https://api.ai21.com/studio/v1/summarize', options)
      
      if (summary.ok) {
        console.log(url);
        break;
      }
    }

    if (!summary.ok) {
      res.status(500).json({ message: 'Answer not found' });
      return;
    }

    const summaryData = await summary.json();

    let summaryText = summaryData.summary;
    // remove all "None " from the summary
    // console.log(summaryText.includes("None"))
    summaryText = summaryText.split("None").join("");
    // console.log(summaryText)

    res.status(200).json({ message: summaryText });
  }
}
