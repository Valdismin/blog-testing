import {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { addPost } from "../../store/reducers/posts";
import {AppDispatch, RootState} from "../../store/store";

export default function PostForm() {
    const dispatch = useDispatch<AppDispatch>();
    const currentUserId = useSelector((s: RootState) => s.auth.currentUserId);

    const [newPost, setNewPost] = useState({ title: "", body: "" });

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPost((prev) => ({ ...prev, title: e.target.value }));
    };

    const handleChangeBody = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPost((prev) => ({ ...prev, body: e.target.value }));
    };

    const handleAdd = () => {
        if (!newPost.title.trim() || !currentUserId) return;

        dispatch(
            addPost({
                id: Date.now(),
                userId: currentUserId,
                title: newPost.title,
                body: newPost.body,
                priority: 0,
                likes: 0,
                dislikes: 0,
                likedBy: [],
                dislikedBy: [],
                favorite: false,
            })
        );

        setNewPost({ title: "", body: "" });
    };
    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 700,
                width: {
                    xs: "100%",
                    sm: "100%",
                    md: 700
                },
                mx: "auto",
                p: 3,
                mb: 3,
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Создать пост
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Заголовок"
                    value={newPost.title}
                    onChange={handleChangeTitle}
                    size="small"
                    fullWidth
                />
                <TextField
                    label="Текст"
                    value={newPost.body}
                    onChange={handleChangeBody}
                    size="small"
                    fullWidth
                    multiline
                    minRows={3}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    fullWidth
                >
                    Добавить пост
                </Button>
            </Box>
        </Paper>
    );
}
