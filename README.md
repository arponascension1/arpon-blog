# Arpon Blog 🚀

A modern, high-performance blog engine built with **Laravel 12**, **Inertia.js v2**, and **React**. Designed for speed, SEO, and seamless user interaction.

[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

## ✨ Key Features

### 📖 For Readers
- **Seamless Browsing:** Lightning-fast page transitions powered by Inertia.js.
- **Activity Tracking:** Logged-in users can track their reading history and liked stories.
- **Engagement:** Interactive "Like" system with real-time feedback.
- **Search:** Instant search across articles, categories, and tags.
- **Responsive Design:** Beautifully crafted UI that works on any device.

### 🛠️ For Administrators
- **Powerful Dashboard:** Real-time platform activity feed and comprehensive analytics.
- **Content Management:** Full CRUD for Posts, Categories, and Tags with a rich text editor.
- **Media Library:** Robust file management for featured images and post assets.
- **User Management:** Control roles (Admin/User) and monitor individual user activity.
- **Site Settings:** Easily configure site name, logo, social links, and SEO metadata.

## 🛠️ Tech Stack

- **Backend:** Laravel 12 (PHP 8.3+)
- **Frontend:** React with TypeScript
- **State Management:** Inertia.js v2 (Server-side routing with Client-side rendering)
- **Styling:** Tailwind CSS 4.0
- **Database:** MySQL / SQLite
- **SEO:** Built-in Meta tags, OpenGraph support, Sitemap, and RSS Feed generation.

## 🚀 Getting Started

### Prerequisites
- PHP 8.3+
- Composer
- Node.js & NPM
- MySQL or SQLite

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arponascension1/arpon-blog.git
   cd arpon-blog
   ```

2. **Install dependencies:**
   ```bash
   composer install
   npm install
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Setup Database:**
   ```bash
   # Configure your database in .env first
   php artisan migrate --seed
   ```

5. **Symlink Storage:**
   ```bash
   php artisan storage:link
   ```

6. **Compile Assets:**
   ```bash
   npm run dev
   # OR for production
   npm run build
   ```

7. **Start the Server:**
   ```bash
   php artisan serve
   ```

## 📸 Screenshots

*Coming Soon*

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---
Built with ❤️ by [Arpon](https://github.com/arponascension1)
