import React, { useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

interface Article {
    id: number;
    title: string;
    content: string;
}

export function App() {
    const endpoint = 'http://localhost:4000';
    const fetcher = (url: string) => fetch(`${endpoint}/${url}`).then((res) => res.json());
    const { data, error } = useSWR('api/articles', fetcher);

    useEffect(() => {
        console.log(data, error);
    }, [data, error]);

    return (
        <StyledApp>
            {error && <ErrorText>Error: {error.message}</ErrorText>}
            {data ? (
                <DataContainer>
                    {data.map((article: Article, index: number) => (
                        <Article key={index}>
                            <ArticleTitle>{article.title}</ArticleTitle>
                            <ArticleContent>{article.content}</ArticleContent>
                        </Article>
                    ))}
                </DataContainer>
            ) : (
                <LoadingText>Loading...</LoadingText>
            )}
        </StyledApp>
    );
}

export default App;

const StyledApp = styled.div`
    padding: 20px;
`;

const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Article = styled.div`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const ArticleTitle = styled.h2`
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
`;

const ArticleContent = styled.p`
    color: #666;
    font-size: 18px;
`;

const ErrorText = styled.div`
    color: red;
    font-size: 20px;
`;

const LoadingText = styled.div`
    color: green;
    font-size: 20px;
`;
