import fetch from 'node-fetch';

export const YoutubePreviewService = {
    fetchPreviewUrl: async (videoId: string): Promise<string> => {
        const htmlString = await getHtml(videoId);
        return grabUrl(videoId, htmlString);
    },

    fetchBufferFromUrl: async (url: string): Promise<Buffer> => {
        const response = await fetch(url);
        return response.buffer();
    }
}

async function getHtml(videoId: string): Promise<string> {
    const apiResponse = await fetch(`https://www.youtube.com/results?search_query=${videoId}`, {
        headers: {
            Accept: 'text/html',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36 Edg/87.0.664.75'
        }
    });
    const searchPageHtml = await apiResponse.text();
    return searchPageHtml;
}

function grabUrl(videoId: string, youtubeSearchPageHtml: string): string {
    const regExp = RegExp(`movingThumbnailDetails(.*)(?<url>https:\/\/i\.ytimg\.com\/(an_webp\/)?${videoId}.+?)(\\\")`);
    const result = regExp.exec(youtubeSearchPageHtml);
    const rawUrl = result?.groups?.url ?? '';
    return JSON.parse(`"${rawUrl}"`);
}
