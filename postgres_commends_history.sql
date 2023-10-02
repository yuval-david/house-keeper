/***********************  BUILDINGS  ************************/
CREATE TABLE building (
   id SERIAL PRIMARY KEY,
   street TEXT,
   number INTEGER,
   city TEXT
);

INSERT INTO building (
   street,
   number,
   city
)
VALUES
('לבונטין', '2', 'תל אביב'),
('שלמה המלך', '9', 'ראשון לציון'),
('שרגא רפאלי', '30', 'פתח תקווה');

/***********************  MEETINGS  ************************/
CREATE TABLE meetings (
   id serial not null primary key,
   name varchar(100),
   date date,
   location varchar(100),
   description text,
   summary text
);

ALTER TABLE meetings
ADD COLUMN time time;

/***********************  USERS  ************************/
CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   id_number INTEGER,
   name TEXT NOT NULL,
   phone INTEGER,
   isVahadBait BOOLEAN,
   isManagementCompany BOOLEAN,
   email TEXT,
   apartment_floor INTEGER,
   apartment_number INTEGER,
   apartment_spm INTEGER,
   building_id INTEGER,
   FOREIGN KEY (building_id) REFERENCES building(id)
);

INSERT INTO users (
   id_number,
   name,
   phone,
   isVahadBait,
   isManagementCompany,
   email,
   apartment_floor,
   apartment_number,
   apartment_spm,
   building_id
)
VALUES
(209874512, 'לירון כהן', 0503455561, false, false, 'lironc@walla.com', 3, 7, 62, 1),
(204715412, 'מאי יששכר', 0502220567, false, false, 'mayi@walla.com', 4, 13, 72, 1),
(201478774, 'איתי פאר', 0521470567, false, false, 'itayp@gmail.com', 4, 14, 70, 1),
(208000774, 'רון כהן', 0541470567, true, false, 'ronco@gmail.com', 6, 20, 72, 1),
(207100970, 'דנה רון', 0530950567, false, true, 'dana_office@gmail.com', null, null, null, 1),
(201118774, 'משה לוי', 0521411411, false, false, 'moshelevy@gmail.com', 1, 1, 60, 2),
(208550774, 'לימור שרון', 0540070565, true, false, 'limori@gmail.com', 5, 18, 60, 2),
(207122180, 'קובי עמר', 0500333567, false, true, 'kobi_office@gmail.com', null, null, null, 2),
(204798034, 'אריה גלבוע', 0521418400, false, false, 'ariag@gmail.com', 1, 1, 65, 3),
(205558034, 'ששון מזרחי', 0521418400, true, false, 'ariag@gmail.com', 3, 8, 60, 3),
(310110080, 'עמיר עמר', 0500447507, false, true, 'amir_office@gmail.com', null, null, null, 2);

ALTER TABLE users
ADD COLUMN password VARCHAR(255);

/*****************  USERS <-> MEETINGS  ******************/
CREATE TABLE user_meetings (
   user_id INTEGER,
   meeting_id INTEGER,
   PRIMARY KEY (user_id, meeting_id),
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (meeting_id) REFERENCES meetings(id)
);

insert into user_meetings
(user_id, meeting_id)
VALUES
(1, 2),
(1, 1),
(2, 1),
(2, 2);

/***********************  FAULTS  ************************/
CREATE TABLE faults (
   id SERIAL PRIMARY KEY,
   name VARCHAR(50),
   severity VARCHAR(50),
   urgency VARCHAR(50),
   location VARCHAR(50),
   status BOOLEAN,
   handledBy VARCHAR(50),
   vendor BOOLEAN,
   price INT,
   building_id INT,
   FOREIGN KEY (building_id) REFERENCES building(id)
);

INSERT INTO faults
(name, severity, urgency, location, status, handledBy, vendor, price, building_id)
VALUES
('נזילה בגג', 'בינונית', 'דחופה', 'גג הבניין', false, null, null, null, 1),
('צבע דהוי', 'קלה', 'לא דחופה', 'חדר המדרגות', false,  null, null, null, 1),
('צבע דהוי', 'קלה', 'לא דחופה', 'לובי', false,  null, null, null, 2);

/************  MANAGEMENT COMPANIES INFORMATION  ************/
CREATE TABLE management_information (
   building_id INTEGER PRIMARY KEY REFERENCES building(id),
   name VARCHAR(255),
   representativeName VARCHAR(255),
   phone INTEGER,
   email VARCHAR(255),
   paymentName VARCHAR(255),
   paymentAccountNumber INTEGER,
   paymentBankName VARCHAR(255),
   paymentBranch VARCHAR(255)
);

/************  MANAGEMENT COMPANIES CONTRACTORS  ************/
CREATE TABLE management_contractors (
   id SERIAL PRIMARY KEY,
   building_id INTEGER REFERENCES building(id),
   role VARCHAR(255),
   fullName VARCHAR(255),
   phone INTEGER
);


/***********************  UPDATES  ************************/
CREATE TABLE updates (
   id SERIAL PRIMARY KEY,
   building_id INT,
   type VARCHAR(20),
   item_id INT,
   item_name VARCHAR(40),
   item_date DATE,
   timestemp TIMESTAMPTZ DEFAULT Now() 
);