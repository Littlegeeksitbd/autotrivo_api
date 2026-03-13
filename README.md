```create User
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```create Services
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```create orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_amount NUMERIC(10,2) NOT NULL,
    service_ids INTEGER[] NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```order items
CREATE TABLE order_items (
id SERIAL PRIMARY KEY,
order_id INTEGER NOT NULL,
service_id INTEGER NOT NULL,
amount NUMERIC(10,2) NOT NULL,
status VARCHAR(50) DEFAULT 'pending',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO order_items (order_id, service_id, amount, status)
VALUES (1, 3, 5.99, 'pending');

SELECT oi.*, s.name
FROM order_items oi
JOIN services s ON s.id = oi.service_id
WHERE oi.order_id = 1;
```

```
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    order_id INTEGER NULL,
    amount NUMERIC(10,2) NOT NULL,
    trxid VARCHAR(150) UNIQUE NOT NULL,
    merchant_id VARCHAR(150),
    status VARCHAR(50) DEFAULT 'pending',
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO transactions 
(user_id, order_id, amount, trxid, merchant_id, status, note)
VALUES
(1, 10, 25.50, 'BINANCE12345', 'merchant_01', 'completed', 'USDT payment');
```