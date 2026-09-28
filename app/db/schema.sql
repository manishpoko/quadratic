CREATE TYPE task_status as ENUM('pending', 'in process', 'delayed', 'completed');


CREATE TYPE task_priority as ENUM ('light', 'moderate', 'urgent', 'high-priority');


CREATE TABLE users(
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE issues(
    id UUID PRIMARY KEY,
    user_id UNIQUE TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT ,
        status task_status DEFAULT 'pending'
,
    priority task_priority DEFAULT 'moderate',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE 

