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
CREATE TABLE **users** (
   id SERIAL PRIMARY KEY,
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

/*****************  USERS <-> MEETINGS  ******************/
CREATE TABLE user_meetings (
   user_id INTEGER,
   meeting_id INTEGER,
   PRIMARY KEY (user_id, meeting_id),
   FOREIGN KEY (user_id) REFERENCES users(id),
   FOREIGN KEY (meeting_id) REFERENCES meetings(id)
);

/***********************  FAULTS  ************************/
CREATE TABLE faults (
   id SERIAL PRIMARY KEY,
   details TEXT,
   severity VARCHAR(50),
   location VARCHAR(50),
   status BOOLEAN,
   handledBy VARCHAR(50),
   vendor BOOLEAN,
   price INT,
   building_id INT,
   FOREIGN KEY (building_id) REFERENCES building(id)
);

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