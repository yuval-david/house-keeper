CREATE TABLE meetings (
 id serial not null primary key,
 name varchar(100),
 date date,
 location varchar(100),
 description text,
 summary text
);

ALTER TABLE meetings
ADD COLUMN users int[];