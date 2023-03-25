CREATE TABLE IF NOT EXISTS job_offer (
    id bigserial PRIMARY KEY,
    title VARCHAR (128) NOT NULL,
    address VARCHAR (128) NOT NULL,
    salary VARCHAR (128) NOT NULL,
    contract_type VARCHAR (128) NOT NULL,
    description TEXT NOT NULL,
    author VARCHAR (128) NOT NULL,
    created_at DATE  NOT NULL,
    updated_at DATE  NOT NULL,
);

