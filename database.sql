CREATE DATABASE thrifty;

CREATE TABLE table_test(
    -- unique key to the item
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);