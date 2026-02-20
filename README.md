# 🚀 ShortsPilot

> AI-Powered YouTube & Instagram Shorts Automation Platform

ShortsPilot is a full-stack AI automation platform that generates short-form videos and schedules them for posting on **YouTube Shorts** and **Instagram Reels** automatically.

Built with modern web technologies, ShortsPilot helps creators automate content production and publishing — saving time and scaling content effortlessly.

---

## ✨ Features

* 🎬 **AI Video Generation** – Automatically generates short videos
* 🧠 **AI Script Creation** – Smart script generation for engaging content
* 🔊 **AI Voiceover** – Converts scripts into realistic voice narration
* 🖼 **Image & Media Handling** – Optimized media storage using ImageKit
* 📝 **Auto Subtitles** – Generates captions for better engagement
* 📅 **Post Scheduling** – Schedule videos for:

  * YouTube Shorts
  * Instagram Reels
* ☁️ **Cloud-Based Storage**
* 🔐 Authentication & User Dashboard
* 📊 Scalable & Creator-Friendly Architecture

---

## 🛠 Tech Stack

| Technology              | Usage                                     |
| ----------------------- | ----------------------------------------- |
| **Next.js**             | Frontend & Backend (Full-stack framework) |
| **MongoDB**             | Database                                  |
| **ImageKit**            | Media storage & optimization              |
| **YouTube API**         | Upload & scheduling                       |
| **Instagram Graph API** | Reels scheduling                          |
| **AI APIs**             | Script, voice & video generation          |

---

## 🏗 Architecture Overview

1. User enters video topics
2. AI generates script
3. Voiceover is created
4. Images/video assets generated
5. Video compiled
6. Stored in ImageKit
7. Saved in MongoDB
8. User schedules post
9. Auto-published to YouTube & Instagram

---

## 📂 Project Structure

```
ShortsPilot/
│
├── app/                # Next.js app router
├── components/         # UI components
├── lib/                # Utility functions
├── models/             # MongoDB models
├── api/                # API routes
├── public/             # Static files
└── README.md
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/shortspilot.git

# Navigate into project
cd shortspilot

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env.local` file:

```
MONGODB_URI=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
YOUTUBE_API_KEY=
INSTAGRAM_ACCESS_TOKEN=
AI_API_KEY=
```

---

## 📅 Scheduling Feature

ShortsPilot allows you to:

* Select date & time
* Choose platform (YouTube / Instagram)
* Automatically publish at scheduled time
* Manage content calendar from dashboard

---

## 🎯 Use Cases

* Content Creators
* Influencers
* Faceless YouTube Channels
* AI Automation Businesses
* Social Media Managers

---

## 🚀 Future Improvements

* 📊 Analytics Dashboard
* 🔁 Bulk Video Generation
* 🤖 Multiple AI Voice Options
* 🎨 Template Customization
* 💳 Subscription Model

---

## 🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

MIT License

---

## 👨‍💻 Author

**Ayush Sharma || Aditya Routh**
Aspiring Backend & Android Developer 🚀

---
