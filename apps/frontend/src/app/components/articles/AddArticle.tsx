import React, { useState } from 'react';
import styled from 'styled-components';

const AddArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitting', { title, content, author });

        try {
            const response = await fetch('http://localhost:4000/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, author }),
            });
            if (response.ok) {
                setTitle('');
                setContent('');
                setAuthor('');
            }
        } catch (error) {
            console.error('Error during submission:', error);
        }
    };

    return (
        <Container>
            <StyledForm onSubmit={handleSubmit}>
                <FormGroup>
                    <StyledLabel htmlFor='title'>Title</StyledLabel>
                    <StyledInput type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <StyledLabel htmlFor='content'>Content</StyledLabel>
                    <StyledTextarea id='content' value={content} onChange={(e) => setContent(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <StyledLabel htmlFor='author'>Author</StyledLabel>
                    <StyledInput type='text' id='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                </FormGroup>
                <StyledButton type='submit'>Add Article</StyledButton>
            </StyledForm>
        </Container>
    );
};

export default AddArticle;

const Container = styled.div`
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-top: 20px;
    background-color: #f5f5f5;
    max-width: 600px;
    margin: 20px auto;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const StyledLabel = styled.label`
    font-size: 18px;
    color: #333;
`;

const StyledInput = styled.input`
    padding: 8px 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const StyledTextarea = styled.textarea`
    padding: 8px 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    min-height: 100px;
`;

const StyledButton = styled.button`
    padding: 10px 20px;
    font-size: 18px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;
