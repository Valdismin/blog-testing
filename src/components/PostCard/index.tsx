import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../../store/store";
import {
    toggleDislike,
    toggleLike,
    toggleFavorite,
    removePost,
} from "../../store/reducers/posts";
import { Post } from "../../types/types";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Box,
} from "@mui/material";
import { Heart, ThumbsDown, Star, Trash2 } from "lucide-react";

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const currentUserId = useSelector((s: RootState) => s.auth.currentUserId);

    const handleLike = () => {
        dispatch(toggleLike({ id: post.id, userId: currentUserId }));
    };

    const handleDislike = () => {
        dispatch(toggleDislike({ id: post.id, userId: currentUserId }));
    };

    const handleFavorite = () => {
        dispatch(toggleFavorite(post.id));
    };

    const handleRemove = () => {
        dispatch(removePost(post.id));
    };

    return (
        <Card
            sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6, backgroundColor: "grey.50" },
            }}
        >
            <CardContent>
                <Link to={`/posts/${post.id}`} style={{ textDecoration: "none" }}>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="text.primary"
                        sx={{ "&:hover": { color: "primary.main" } }}
                    >
                        {post.title}
                    </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary" mt={1}>
                    {post.body.slice(0, 100)}...
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <Box display="flex" gap={1}>
                    <IconButton
                        color={post.likedBy.includes(currentUserId) ? "error" : "default"}
                        onClick={handleLike}
                    >
                        <Heart size={20} />
                        <Typography variant="caption" ml={0.5}>
                            {post.likes}
                        </Typography>
                    </IconButton>

                    <IconButton
                        color={
                            post.dislikedBy.includes(currentUserId) ? "primary" : "default"
                        }
                        onClick={handleDislike}
                    >
                        <ThumbsDown size={20} />
                        <Typography variant="caption" ml={0.5}>
                            {post.dislikes}
                        </Typography>
                    </IconButton>

                    <IconButton
                        color={post.favorite ? "warning" : "default"}
                        onClick={handleFavorite}
                    >
                        <Star size={20} />
                    </IconButton>
                </Box>

                <IconButton
                    color="default"
                    sx={{ "&:hover": { color: "error.main" } }}
                    onClick={handleRemove}
                >
                    <Trash2 size={20} />
                </IconButton>
            </CardActions>
        </Card>
    );
}
