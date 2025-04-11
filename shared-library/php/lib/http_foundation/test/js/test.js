/**
 * @author: Michael Naatjes
 * @date: 2025-04-05
 * @description: This file contains the test cases for the requests library.
 */
const cart = { items: [
    {
        productId: "CPU-INTEL-14900K",
        name: "Intel Core i9-14900K Processor",
        quantity: 1,
        price: 600.00,
        specs: {
            cores: 24,
            threads: 32,
            baseClock: "3.2 GHz",
            boostClock: "6.0 GHz",
            socket: "LGA 1700"
    }},
    {
        productId: "GPU-NVIDIA-RTX4090",
        name: "NVIDIA GeForce RTX 4090 Founders Edition",
        quantity: 1,
        price: 1599.99,
        specs: {
            memory: "24GB GDDR6X",
            cudaCores: 16384,
            boostClock: "2.52 GHz"
    }},
        {
        productId: "MB-ASUS-ROG-Z790",
        name: "ASUS ROG Maximus Z790 Hero Motherboard",
        quantity: 1,
        price: 599.99,
        specs: {
            chipset: "Intel Z790",
            socket: "LGA 1700",
            formFactor: "ATX",
            memorySlots: 4
    }},
    {
        productId: "RAM-CORSAIR-64GB-DDR5",
        name: "Corsair Dominator Platinum RGB 64GB (2x32GB) DDR5 6000MHz",
        quantity: 1,
        price: 349.99,
        specs: {
            capacity: "64GB (2 x 32GB)",
            speed: "6000MHz",
            type: "DDR5",
            latency: "CL30"
    }}
]};
const display   = document.getElementById('display');
const btn_json  = document.getElementById('btn_json');
/**
 * @listens {click} document#input
 */
btn_json.addEventListener('click', function(e){
    /**
     * Query String
     */
    const query = new URLSearchParams();
    query.append('name', 'Gemini');
    query.append('animal', 'dog');
    query.append('age', 1);
    const url   = 'src/test.php/api/users?' + query.toString();
    /**
     * Value
     */
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...cart,
            msg: 'Pellentesque a neque ac nisl tempor volutpat. Maecenas bibendum'
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        //display.innerHTML = data.value;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
const form = document.getElementById('form');
/**
 * @listens#form
 */
form.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(form);

    fetch('src/test.php/',
        {
            method: "POST",
            body: formData
        }
    )
    .then(response => {
        if(!response.ok){
            throw new Error('Could not submit form!');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error('Error: ', err);
    });
});
/**
 * XML Test
 */
const xml = `
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>My Awesome Podcast</title>
    <link>https://www.example.com/podcast</link>
    <description>A podcast about interesting topics and engaging conversations.</description>
    <language>en-us</language>
    <copyright>&#xA9; 2025 My Awesome Podcast</copyright>
    <pubDate>Wed, 09 Apr 2025 20:40:00 EDT</pubDate>
    <lastBuildDate>Wed, 09 Apr 2025 20:40:00 EDT</lastBuildDate>
    <category>Technology</category>
    <itunes:author>John Doe</itunes:author>
    <itunes:owner>
      <itunes:name>John Doe</itunes:name>
      <itunes:email>john.doe@example.com</itunes:email>
    </itunes:owner>
    <itunes:image href="https://www.example.com/podcast/images/podcast_logo.jpg"/>
    <itunes:category text="Technology"/>
    <itunes:explicit>no</itunes:explicit>
    <atom:link href="https://www.example.com/podcast/rss.xml" rel="self" type="application/rss+xml"/>

    <item>
      <title>Episode 1: The Future of AI</title>
      <link>https://www.example.com/podcast/episodes/episode1</link>
      <description>In this episode, we delve into the exciting possibilities and challenges of artificial intelligence.</description>
      <pubDate>Tue, 08 Apr 2025 10:00:00 EDT</pubDate>
      <enclosure url="https://www.example.com/podcast/episodes/episode1.mp3" length="12345678" type="audio/mpeg"/>
      <guid isPermaLink="true">https://www.example.com/podcast/episodes/episode1</guid>
      <itunes:duration>00:30:15</itunes:duration>
      <itunes:episode>1</itunes:episode>
      <itunes:season>1</itunes:season>
      <itunes:explicit>no</itunes:explicit>
    </item>

    <item>
      <title>Episode 2: Exploring Space</title>
      <link>https://www.example.com/podcast/episodes/episode2</link>
      <description>Join us as we explore the latest discoveries and missions in space exploration.</description>
      <pubDate>Wed, 09 Apr 2025 11:30:00 EDT</pubDate>
      <enclosure url="https://www.example.com/podcast/episodes/episode2.mp3" length="9876543" type="audio/mpeg"/>
      <guid isPermaLink="true">https://www.example.com/podcast/episodes/episode2</guid>
      <itunes:duration>00:25:40</itunes:duration>
      <itunes:episode>2</itunes:episode>
      <itunes:season>1</itunes:season>
      <itunes:explicit>no</itunes:explicit>
    </item>

    </channel>
</rss>
`;
const btn_xml = document.getElementById('btn_xml');
btn_xml.addEventListener('click', function(e){
    fetch('src/test.php/', {
        method: "POST",
        headers: {
            "Content-Type": 'text/xml'
        },
        body: xml
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Could not submit form!');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error('Error: ', err);
    });
});
/**
 * Sending HTML
 */
const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Test HTML</title>
  </head>
  <body>
    <h1>Hello from JavaScript!</h1>
    <p>This is an HTML string sent in the body.</p>
  </body>
  </html>
`;
const btn_html = document.getElementById('btn_html');
btn_html.addEventListener('click', function(e){
    fetch('src/test.php/', {
        method: "POST",
        headers: {
            "Content-Type": 'text/html'
        },
        body: html
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Could not submit form!');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error('Error: ', err);
    });
});
/**
 * CSV
 */
const csv = `
    Account Number,Account Holder,Account Type,Balance,Currency,Opening Date
    1234567890,John Doe,Checking,1500.75,USD,2023-08-15
    9876543210,Jane Smith,Savings,10500.20,USD,2022-11-20
    1122334455,Acme Corp,Business Checking,55000.00,USD,2024-01-05
    6677889900,Peter Jones,Checking,234.56,USD,2024-05-10
    5432109876,Sarah Williams,Savings,8765.43,EUR,2023-03-01
`;
const btn_csv = document.getElementById('btn_csv');
btn_csv.addEventListener('click', function(){
    fetch('src/test.php/', {
        method: "POST",
        headers: {
            "Content-Type": 'text/csv'
        },
        body: csv
    })
    .then(response => {
        if(!response.ok){
            throw new Error('Could not submit form!');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error('Error: ', err);
    });
});