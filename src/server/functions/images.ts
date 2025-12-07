import { createServerFn } from '@tanstack/react-start'

/**
 * Get a direct upload URL for Cloudflare Images
 * Client uploads directly to Cloudflare using this URL
 */
export const getImageUploadUrl = createServerFn({ method: 'POST' }).handler(
  async () => {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
    const apiToken = process.env.CLOUDFLARE_IMAGES_API_TOKEN

    if (!accountId || !apiToken) {
      throw new Error(
        'Cloudflare Images credentials not configured. Please set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_IMAGES_API_TOKEN in .env.local',
      )
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v2/direct_upload`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requireSignedURLs: false,
          metadata: { source: 'chez-maureen' },
        }),
      },
    )

    const data = await response.json()

    if (!data.success) {
      throw new Error(
        data.errors?.[0]?.message || 'Failed to get upload URL from Cloudflare',
      )
    }

    return {
      id: data.result.id,
      uploadURL: data.result.uploadURL,
    }
  },
)
