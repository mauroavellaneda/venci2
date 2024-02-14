import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import useSWR, { mutate } from 'swr';
import AddArticle, { IFormInput, StyledButton } from './components/articles/AddArticle';

interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
}

export function App() {
    const endpoint = 'http://localhost:4000';
    const articlesEndpoint = 'api/articles';

    const [updatingArticle, setUpdatingArticle] = useState<(IFormInput & { id: number }) | null>(null);

    const fetcher = (url: string) => fetch(`${endpoint}/${url}`).then((res) => res.json());
    const { data, error, isLoading } = useSWR(articlesEndpoint, fetcher);

    const [articleAdded, setArticleAdded] = useState(false);

    useEffect(() => {
        if (articleAdded) {
            mutate(articlesEndpoint);
            setArticleAdded(false);
        }
    }, [articleAdded]);

    const onEditArticle = (article: Article) => {
        const articleToUpdate: IFormInput & { id: number } = {
            title: article.title,
            content: article.content,
            author: article.author,
            id: article.id,
        };
        setUpdatingArticle(articleToUpdate);
    };

    return (
        <Fragment>
            <StyledApp>
                {error && <ErrorText>Error: {error.message}</ErrorText>}
                {data && (
                    <DataContainer>
                        {data.map((article: Article) => (
                            <ArticleCard key={article.id}>
                                <ArticleTitle>{article.title}</ArticleTitle>
                                <ArticleContent>{article.content}</ArticleContent>
                                <ArticleAuthor>By: {article.author}</ArticleAuthor>
                                <StyledButton onClick={() => onEditArticle(article)}>Edit</StyledButton>
                            </ArticleCard>
                        ))}
                    </DataContainer>
                )}
                {isLoading && <LoadingText>Loading</LoadingText>}
            </StyledApp>
            <AddArticle
                onArticleAdded={() => {
                    setArticleAdded(true);
                    setUpdatingArticle(null); // Reset updating article after update
                }}
                isUpdating={Boolean(updatingArticle)}
                articleToUpdate={updatingArticle}
            />
        </Fragment>
    );
}

export default App;

const StyledApp = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const DataContainer = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    @media (max-width: 768px) {
        /* Tablet and below */
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        /* Mobile */
        grid-template-columns: repeat(1, 1fr);
    }
`;

const ArticleCard = styled.div`
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }
`;

const ArticleTitle = styled.h2`
    color: #333;
    font-size: 24px;
    margin-bottom: 15px;
`;

const ArticleContent = styled.p`
    color: #666;
    font-size: 18px;
    line-height: 1.6;
`;

const ArticleAuthor = styled.p`
    color: #888;
    font-size: 16px;
    font-style: italic;
    margin-top: 15px;
`;

const ErrorText = styled.div`
    color: red;
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
`;

const LoadingText = styled.div`
    color: green;
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
`;
