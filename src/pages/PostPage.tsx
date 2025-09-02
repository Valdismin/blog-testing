import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { addComment } from "../store/reducers/comments";
import { useState, useCallback } from "react";
import {
    Typography,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Button,
    Box,
    Divider,
} from "@mui/material";

export default function PostPage() {
    const { id } = useParams<{ id: string }>();
    const postId = Number(id);

    const post = useSelector((s: RootState) =>
        s.posts.list.find((p) => p.id === postId)
    );
    const comments = useSelector((s: RootState) =>
        s.comments.list.filter((c) => c.postId === postId)
    );

    const dispatch = useDispatch<AppDispatch>();
    const [text, setText] = useState("");

    const handleAdd = useCallback(() => {
        if (!text.trim() || !post) return;

        dispatch(
            addComment({
                id: Date.now(),
                postId: post.id,
                name: "You",
                email: "you@example.com",
                body: text,
            })
        );

        setText("");
    }, [text, post, dispatch]);

    if (!post) {
        return (
            <Typography variant="h6" color="error">
                Пост не найден
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, margin: "0 auto", mt: 4 }}>
            <Card sx={{ mb: 3 }}>
                <CardHeader title={post.title} />
                <CardContent>
                    <Typography variant="body1">{post.body}</Typography>
                </CardContent>
            </Card>

            <Typography variant="h6" gutterBottom>
                Комментарии
            </Typography>

            {comments.map((c) => (
                <Card key={c.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                            {c.email}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2">{c.body}</Typography>
                    </CardContent>
                </Card>
            ))}

            <Box sx={{ mt: 3 }}>
                <TextField
                    label="Ваш комментарий"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                />
                <Button
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Добавить
                </Button>
            </Box>
        </Box>
    );
}
