// api/hyperbeam.js

export default async function handler(req, res) {
  const API_KEY = process.env.HYPERBEAM_API_KEY;

  const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: "https://example.com", // Or any URL you'd like to open
    }),
  });

  const data = await response.json();

  if (response.ok) {
    res.status(200).json(data);
  } else {
    res.status(response.status).json({ error: data });
  }
}
