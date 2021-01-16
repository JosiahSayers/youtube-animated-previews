import bodyParser from 'body-parser';
import { Request, Response, Router } from 'express';
import { YoutubePreviewService } from '../Services/yt-preview.service';

const router = Router();

router.use(bodyParser.json());

router.get('/:videoId', async (req: Request, res: Response) => {
    if (!req.params?.videoId) return res.status(400).json({ msg: 'You must provide a video ID' });
    try {
        return res.json({ url: await YoutubePreviewService.fetchPreviewUrl(req.params.videoId) });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Unknown error occurred' });
    }
});

export default router;
