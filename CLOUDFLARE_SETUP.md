# Cloudflare Images Setup Guide

## Required Environment Variables

Add these variables to your `.env.local` and `.env.example` files:

```env
# Cloudflare Images Configuration
CLOUDFLARE_ACCOUNT_ID="your-account-id-here"
CLOUDFLARE_IMAGES_API_TOKEN="your-api-token-here"
```

## Setup Steps

### 1. Enable Cloudflare Images

1. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account
3. Click on "Images" in the left sidebar
4. Click "Enable Cloudflare Images" (pay-as-you-go pricing)

### 2. Get Your Account ID

1. While in the Cloudflare Dashboard, look at the URL
2. Your Account ID is in the URL: `https://dash.cloudflare.com/{account-id}/images`
3. Copy this Account ID

### 3. Create an API Token

1. Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Click "Create Custom Token"
4. Configure the token:
   - **Token name**: `Chez Maureen - Image Uploads`
   - **Permissions**:
     - Account → Cloudflare Images → Edit
   - **Account Resources**:
     - Include → Your Account
5. Click "Continue to summary"
6. Review and click "Create Token"
7. **IMPORTANT**: Copy the token immediately (you won't be able to see it again!)

### 4. Add to Environment Files

Add the Account ID and API Token to your `.env.local`:

```env
CLOUDFLARE_ACCOUNT_ID="abc123..." # Replace with your actual Account ID
CLOUDFLARE_IMAGES_API_TOKEN="xyz789..." # Replace with your actual API Token
```

Add the same structure (with placeholder values) to `.env.example`:

```env
CLOUDFLARE_ACCOUNT_ID="your-account-id-here"
CLOUDFLARE_IMAGES_API_TOKEN="your-api-token-here"
```

### 5. Restart Your Development Server

After adding the environment variables, restart your dev server:

```bash
npm run dev
```

## How It Works

### Direct Creator Upload Flow

1. **User selects image** in ProductForm
2. **Client requests upload URL** from server function (`getImageUploadUrl`)
3. **Server gets URL from Cloudflare** using Account ID and API Token
4. **Client uploads directly to Cloudflare** (bypasses your server)
5. **Cloudflare returns image URL** (e.g., `https://imagedelivery.net/{account-hash}/{image-id}/public`)
6. **Image URL is saved** in the product's `image` field

### Image Variants

Cloudflare Images automatically creates variants for you:

- `public` - Full resolution
- `thumbnail` - Small size (great for product tables)
- Custom variants can be configured in Cloudflare Dashboard

### Pricing

- **Storage**: $5 per 100,000 images stored
- **Delivery**: $1 per 100,000 images delivered
- First 100,000 images delivered free per month

## Testing

Test the upload flow:

1. Go to `/admin/produits/new`
2. Fill in product details
3. Click "Upload Image" button
4. Select an image file
5. Upload should complete and show preview
6. Submit the form
7. Check that the image URL is saved and displays correctly

## Troubleshooting

### "Cloudflare Images credentials not configured"

- Make sure `.env.local` has both `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_IMAGES_API_TOKEN`
- Restart your dev server after adding env vars

### Upload fails with 401 Unauthorized

- Check that your API Token has `Cloudflare Images: Edit` permission
- Verify the token hasn't expired
- Make sure you selected the correct account in the token configuration

### Upload fails with 403 Forbidden

- Verify your Account ID is correct
- Ensure Cloudflare Images is enabled for your account

### Image doesn't display

- Check that `requireSignedURLs` is set to `false` (it is in our implementation)
- Verify the image URL format: `https://imagedelivery.net/{hash}/{id}/public`
- Check browser console for CORS errors

## Security Notes

- **Never commit** `.env.local` to git (it's in `.gitignore`)
- **API Token** should be kept secret
- Direct upload means users upload directly to Cloudflare (doesn't go through your server)
- Files are immediately public by default (we set `requireSignedURLs: false`)
- Consider adding file size/type validation on the client side
