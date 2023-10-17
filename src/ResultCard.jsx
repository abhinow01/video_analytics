import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function ResultCard ({videoData, earnings}) {
    const thumbnailUrl = videoData.snippet.thumbnails.medium.url;
    const title = videoData.snippet.title;
    const views = videoData.statistics.viewCount;
    const likes = videoData.statistics.likeCount;
    const comments = videoData.statistics.commentCount;  

    return (
        <Card sx={{ maxWidth: 345, margin: '10px', display: 'flex' }}>
            <CardMedia
                component="img"
                height="140"
                image={thumbnailUrl}
                alt={title}
            />
            <CardContent style={{ flex: 1 }}>
                <Typography variant="subtitle1" component="div">
                    <strong>{title}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <div>Views: {views}</div>
                    <div>Likes: {likes}</div>
                    <div>Comments: {comments}</div>
                </Typography>
            </CardContent>
            <CardContent style={{ flex: 2, textAlign: 'center', height: '100%' }}>
                <Typography variant="h4" component="div">
                    <strong>${earnings.toFixed(2)}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Earnings
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ResultCard;
