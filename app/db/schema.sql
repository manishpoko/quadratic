CREATE TYPE issue_status as ENUM('pending', 'in process', 'delayed', 'completed');


CREATE TYPE issue_priority as ENUM ('light', 'moderate', 'urgent', 'high-priority');


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
    user_id UUID NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT ,
    status issue_status DEFAULT 'pending',
    priority issue_priority DEFAULT 'moderate',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions(
    -- //this is the sessions_id
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    token_hash TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL 
    
);



