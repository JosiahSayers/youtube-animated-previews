import { Request, Response, Router } from 'express';
import fetch from 'node-fetch';
import { YoutubePreviewService } from '../Services/yt-preview.service';

const router = Router();

router.get('/:videoId', async (req: Request, res: Response) => {
    if (!req.params?.videoId) return res.status(400).json({ msg: 'You must provide a video ID' });
    const url = await YoutubePreviewService.fetchPreviewUrl(req.params.videoId);
    const response = await fetch(url);
    const file = await response.buffer();

    res.setHeader('Content-Type', 'image/webp')
    return res.send(file);
});

export default router;
