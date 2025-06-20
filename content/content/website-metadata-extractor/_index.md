## Extract Metadata from Any Website Using Website URL to Metadata

![Website Metadata Extractor API](/images/website-metadata-extractor.webp)

Ever needed to quickly grab metadata from a webpage — like the title, description, social links, or contact info — without digging through HTML? Our **Website Metadata Extractor API** does just that. It gives you a structured overview of a webpage’s key information with a single HTTP request.

In this article, we’ll give you a quick overview of what it does, why it’s useful, and how to use it with minimal setup.

---

### What Can You Do With This API?

Every website hides a treasure trove of metadata that's critical for SEO tools, lead enrichment, scraping, and automation. With one API call, you can extract:

- SEO tags: title, description, canonical, keywords
- Open Graph and Twitter Card data
- Links to social media profiles (LinkedIn, Instagram, Facebook…)
- Emails and phone numbers detected on the page
- Internal and external links
- Technical metadata (redirects, HTTPS status, load time, etc.)

Great for building:

- Automated SEO auditing tools
- Company profile enrichment
- Contact discovery engines
- Marketing dashboards and lead intelligence tools

---

### How It Works (Simple Overview)

The main endpoint accepts a URL and returns structured JSON metadata.

Here’s a basic cURL example:

```bash
curl -X POST "https://your-rapidapi-host.com/scrape" \
  -H "Content-Type: application/json" \
  -H "X-RapidAPI-Host: your-assigned-host" \
  -H "X-RapidAPI-Key: your-api-key" \
  -d '{
    "url": "https://example.com"
  }'
```

Using Node.js:

```js
import axios from 'axios';

const response = await axios.post('https://your-rapidapi-host.com/scrape', {
  url: 'https://example.com'
}, {
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Host': 'your-assigned-host',
    'X-RapidAPI-Key': 'your-api-key'
  }
});

console.log(response.data);
```

Using Python:

```python
import requests

url = "https://your-rapidapi-host.com/scrape"
headers = {
    "Content-Type": "application/json",
    "X-RapidAPI-Host": "your-assigned-host",
    "X-RapidAPI-Key": "your-api-key"
}
data = {"url": "https://example.com"}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```

---

### Want the Full Details?

If you want to see every response field, optional parameters, error codes, and deeper use cases:

👉 [Read the full API documentation](https://rapidapi.com/njoylab/api/website-url-to-metadata)

---

### Try It Now

You can test it instantly on [RapidAPI Hub](https://rapidapi.com/njoylab/api/website-url-to-metadata) with your API key, or integrate it into your project in minutes. No backend required — just plug and go.

Need help or want to propose an advanced use case? Reach out anytime.

