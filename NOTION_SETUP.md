# Notion CMS Setup Guide

## 1. Create Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "+ New integration"
3. Name it "Siebdruck App"
4. Select your workspace
5. Copy the **Internal Integration Token** (starts with `secret_`)

## 2. Create Notion Databases

Create 5 databases in Notion with these exact property names:

### Workshops Database
- **Name** (Title)
- **Description** (Text)
- **Type** (Select: options like "Beginner", "Advanced", etc.)
- **Duration** (Number, in hours)
- **Max Participants** (Number)
- **Price** (Number, in EUR)
- **Image** (Files & media)
- **Status** (Status: Published, Draft)

### Team Members Database
- **Name** (Title)
- **Role** (Text)
- **Bio** (Text)
- **Image** (Files & media)
- **Status** (Status: Active, Inactive)
- **Order** (Number, for sorting)

### Impressions Database
- **Title** (Title)
- **Image** (Files & media)
- **Date** (Date)
- **Published** (Checkbox)

### Booking Requests Database
- **Workshop** (Title)
- **Name** (Text)
- **Email** (Email)
- **Phone** (Phone)
- **Participants** (Number)
- **Preferred Date** (Text)
- **Message** (Text)
- **Status** (Status: Pending, Confirmed, Declined)
- **Created At** (Date)

### Locations Database
- **Name** (Title)
- **Address** (Text)
- **Status** (Status: Active, Inactive)
- **Order** (Number, for sorting)

## 3. Share Databases with Integration

For each database:
1. Click "..." menu in top right
2. Click "Connect to"
3. Select your "Siebdruck App" integration

## 4. Get Database IDs

For each database:
1. Open the database in Notion
2. Copy the URL
3. Extract the ID from the URL:
   `https://notion.so/workspace/DATABASE_ID?v=...`
   The DATABASE_ID is the 32-character string

## 5. Add Environment Variables

Add these to your Vercel project or `.env.local`:

```
NOTION_API_KEY=secret_YOUR_INTEGRATION_TOKEN
NOTION_WORKSHOPS_DB_ID=your_workshops_database_id
NOTION_TEAM_DB_ID=your_team_database_id
NOTION_IMPRESSIONS_DB_ID=your_impressions_database_id
NOTION_BOOKING_REQUESTS_DB_ID=your_booking_requests_database_id
NOTION_LOCATIONS_DB_ID=your_locations_database_id
```

## 6. Test Your Setup

1. Add some test content to each database
2. Make sure Status is set to "Published" or "Active"
3. Deploy your app and visit the pages

## Benefits

✅ Edit content directly in Notion
✅ No database management
✅ Manual booking approval workflow
✅ Easy to add/remove workshops and team members
✅ Simple image management
