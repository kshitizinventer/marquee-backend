CREATE DATABASE marquee ;

CREATE TABLE company(
    id SERIAL PRIMARY KEY,
    cin VARCHAR(100) NOT null,
    name VARCHAR(100) NOT NULL
) ;