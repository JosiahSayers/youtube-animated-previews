import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import { YoutubePreviewService } from '../Services/yt-preview.service';

const router = Router();

router.get('/:videoId', async (req: Request, res: Response) => {
    if (!req.params?.videoId) return res.status(400).json({ msg: 'You must provide a video ID' });
    try {
        const url = await YoutubePreviewService.fetchPreviewUrl(req.params.videoId);
        const buffer = await YoutubePreviewService.fetchBufferFromUrl(url);
        res.setHeader('Content-Type', 'image/webp')
        return res.write(buffer);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Unknown error occurred' });
    }
});

export default router;
