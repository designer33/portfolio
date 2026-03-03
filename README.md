# Portfolio Deployment Guide

Follow these steps to deploy your portfolio live on Vercel.

## 1. Database (MongoDB Atlas)
1.  Create a free account at [mongodb.com](https://www.mongodb.com/cloud/atlas).
2.  Create a new Cluster (Shared/Free).
3.  Under **Network Access**, add `0.0.0.0/0` (Allow access from anywhere).
4.  Under **Database Access**, create a user with a password.
5.  Get your **Connection String** (choose "Drivers", then Node.js). It should look like:
    `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

## 2. Image Storage (Cloudinary)
1.  Create a free account at [cloudinary.com](https://cloudinary.com/).
2.  Go to your **Dashboard**.
3.  Copy your **Cloud Name**, **API Key**, and **API Secret**.

## 3. Deployment (Vercel)
1.  Go to [vercel.com](https://vercel.com/) and import your GitHub repository.
2.  **Environment Variables**: In the Vercel project settings, add the following variables:
    - `MONGODB_URI`: Your Atlas connection string.
    - `JWT_SECRET`: Any random long string.
    - `CLOUDINARY_CLOUD_NAME`: From Cloudinary.
    - `CLOUDINARY_API_KEY`: From Cloudinary.
    - `CLOUDINARY_API_SECRET`: From Cloudinary.
    - `NODE_ENV`: `production`
3.  Click **Deploy**.

## 4. Post-Deployment
- Your site will be live at `https://your-project.vercel.app`.
- To create your admin account on the live site, ensure you have one user in your Atlas database (you can manually add it via the Atlas UI for the first time).
