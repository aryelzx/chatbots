-- SEQUENCE ID FOR TABLE 'USUARIOS'
CREATE SEQUENCE usuarios_id_seq
    START 1
    INCREMENT 1
    MINVALUE 1
    NO MAXVALUE
    CACHE 1;

-- TABLE 'USUARIOS'
CREATE TABLE usuarios (
    id INTEGER NOT NULL DEFAULT nextval('usuarios_id_seq'),
    role VARCHAR(1) NOT NULL,
    email VARCHAR(100) UNIQUE NULL,
    nome VARCHAR(100) NULL,
    cpf VARCHAR(25) UNIQUE NULL,
    senha VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    updated_by NUMERIC(10,0) NULL,
    created_by NUMERIC(10,0) NULL,
    PRIMARY KEY (id)
);

-- SEQUENCE ID FOR TABLE 'CHATS'
CREATE SEQUENCE chats_id_seq
    START 1
    INCREMENT 1
    MINVALUE 1
    NO MAXVALUE
    CACHE 1;

-- TABLE 'CHATS'
CREATE TABLE chats (
    id INTEGER NOT NULL DEFAULT nextval('chats_id_seq'),
    context VARCHAR(255) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NULL,
    status VARCHAR(1) NOT NULL DEFAULT 'A',
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    updated_by INTEGER NULL,
    created_by INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (created_by) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- SEQUENCE ID FOR TABLE 'MENSAGENS'
CREATE SEQUENCE mensagens_id_seq
    START 1
    INCREMENT 1
    MINVALUE 1
    NO MAXVALUE
    CACHE 1;

-- TABLE 'MENSAGENS'
CREATE TABLE mensagens (
    id INTEGER NOT NULL DEFAULT nextval('mensagens_id_seq'),
    chat_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    mensagem TEXT NOT NULL,
    prompt_input_text TEXT NULL,
    tipo VARCHAR(1) NOT NULL,
    prompt_context TEXT NULL,
    prompt_role VARCHAR(100) NULL,
    prompt_modelo VARCHAR(100) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    deleted_by INTEGER NULL,
    updated_by INTEGER NULL,
    created_by INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
);
