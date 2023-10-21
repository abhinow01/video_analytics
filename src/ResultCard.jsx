import React from "react";
import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

function ResultCard ({videoData, earnings}) {
    const thumbnailUrl = videoData.snippet.thumbnails.medium.url;
    const title = videoData.snippet.title;
    const views = videoData.statistics.viewCount;
    const likes = videoData.statistics.likeCount;
    const comments = videoData.statistics.commentCount;  

    return (

        <Card sx={{ maxWidth:700, margin: '20px', display: 'flex' , padding:6, color: "white",background:"#1E1E1E"}}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
            <CardMedia
                component="img"
                style={{height:"50",
                width:"50"}}
                image={thumbnailUrl}
                alt={title}
            />
            </Grid>
        <Grid item xs={3}>
        <Typography variant="body1"  >
              <strong className="multi-line-title">{title}</strong>
            </Typography>
            <Typography variant="body2" >
              Views: {views}
            </Typography>
            <Typography variant="body2" >
              Likes: {likes}
            </Typography>
            <Typography variant="body2" >
              Comments: {comments}
            </Typography>
        </Grid>
   <Grid item xs={6}>
    <Card style={{
        padding: 5,
        background: "#282828",
        color: "white",
        height: "100%"
    }}>
   <Typography variant="h4" component="div">
              <strong>₹{earnings.toFixed(2)}</strong>
            </Typography>
            <Typography variant="caption" >
              Earnings
            </Typography>
            <br />
            <Button style={{
                background:"white",
                borderRadius: 10,
                color:"black",
                margin: 5
            }}>
                <Typography variant="caption">
                    Check how ?
                </Typography>
            </Button>
            </Card>
   </Grid>
            </Grid>
            </CardContent>
        </Card>
    )
}

export default ResultCard;
