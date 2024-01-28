-- 001_init_articles_table.sql
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    author VARCHAR(255),
    done BOOLEAN
);
