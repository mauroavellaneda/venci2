import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface AddArticleProps {
    onArticleAdded: () => void;
    isUpdating?: boolean;
    articleToUpdate?: (IFormInput & { id: number }) | null;
}

export interface IFormInput {
    title: string;
    content: string;
    author: string;
}

const schema = yup
    .object({
        title: yup.string().required('Title is required'),
        content: yup.string().required('Content is required'),
        author: yup.string().required('Author is required'),
    })
    .required();

const AddArticle = (props: AddArticleProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IFormInput>({
        resolver: yupResolver(schema),
        defaultValues: props.articleToUpdate ? props.articleToUpdate : {},
    });

    useEffect(() => {
        if (props.isUpdating && props.articleToUpdate) {
            reset(props.articleToUpdate);
        }
    }, [props.isUpdating, props.articleToUpdate, reset]);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const url = `http://localhost:4000/api/articles${
            props.isUpdating && props.articleToUpdate ? `/${props.articleToUpdate.id}` : ''
        }`;
        const method = props.isUpdating ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                props.onArticleAdded();
            }
        } catch (error) {
            console.error('Error during submission:', error);
        }
    };

    return (
        <Container>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <StyledLabel htmlFor='title'>Title</StyledLabel>
                    <StyledInput type='text' {...register('title')} />
                    {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
                </FormGroup>
                <FormGroup>
                    <StyledLabel htmlFor='content'>Content</StyledLabel>
                    <StyledTextarea {...register('content')} />
                    {errors.content && <ErrorText>{errors.content.message}</ErrorText>}
                </FormGroup>
                <FormGroup>
                    <StyledLabel htmlFor='author'>Author</StyledLabel>
                    <StyledInput type='text' {...register('author')} />
                    {errors.author && <ErrorText>{errors.author.message}</ErrorText>}
                </FormGroup>
                <StyledButton type='submit'>Add Article</StyledButton>
            </StyledForm>
        </Container>
    );
};

export default AddArticle;

const ErrorText = styled.div`
    color: #ff3860; // Bright red color for error messages
    font-size: 14px; // Smaller font size for errors
    margin-top: 5px; // Spacing above the error message
    margin-bottom: 10px; // Spacing below the error message
`;

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

export const StyledButton = styled.button`
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
