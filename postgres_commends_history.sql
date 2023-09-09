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

ALTER TABLE meetings
ADD COLUMN time time;

INSERT INTO meetings (
   name, 
   date, 
   location, 
   description,
   time
)
VALUES
('הסדרי חנייה', '2023-10-18', 'לובי', 'בפגישה נדון בנושא הסדרי החנייה, ונעלה פתרונות.', '20:00'),
('שיפוץ 2024', '2023-11-25', 'דירה 14', '', '18:00'),
('פגישה חודשית', '2023-10-06', 'לובי', 'בפגישה דנו בניקיון הבניין.', '19:30');

