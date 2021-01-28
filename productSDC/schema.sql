-- DROP DATABASE IF EXISTS FEC;

-- CREATE DATABASE IF NOT EXISTS FEC;

USE FEC;

-- CREATE TABLE PRODUCTS (
--   id INT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(40) NOT NULL,
--   slogan VARCHAR(500),
--   description VARCHAR(500),
--   category VARCHAR(40),
--   default_price VARCHAR(40),
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE STYLES (
--   id INT NOT NULL AUTO_INCREMENT,
--   product_id INT,
--   name VARCHAR(40) NOT NULL,
--   sale_price INT,
--   original_price INT,
--   default_style INT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (product_id) REFERENCES PRODUCTS (id) ON DELETE CASCADE ON UPDATE CASCADE
-- );

-- CREATE TABLE RELATED (
--   id INT NOT NULL AUTO_INCREMENT,
--   product_id INT,
--   related_product_id INT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (product_id) REFERENCES PRODUCTS (id) ON DELETE CASCADE ON UPDATE CASCADE
-- );

-- CREATE TABLE SKUSX (
--   id INT NOT NULL AUTO_INCREMENT,
--   style_id INT,
--   size VARCHAR(40),
--   quantity INT,
--   PRIMARY KEY (id),
--   FOREIGN KEY (style_id) REFERENCES STYLES (id) ON DELETE CASCADE ON UPDATE CASCADE
-- );

-- CREATE TABLE SKUS (
--   style_id INT,
--   XS INT,
--   S INT,
--   M INT,
--   L INT,
--   XL INT,
--   XXL INT,
--   One_Size INT,
--   s7 INT,
--   s7d5 INT,
--   s8 INT,
--   s8d5 INT,
--   s9 INT,
--   s9d5 INT,
--   s10 INT,
--   s10d5 INT,
--   S11 INT,
--   s11d5 INT,
--   s12 INT,
--   PRIMARY KEY (style_id),
--   FOREIGN KEY (style_id) REFERENCES STYLES (id) ON DELETE CASCADE ON UPDATE CASCADE
-- );

-- CREATE TABLE SKUS (
--   style_id INT,
--   XS INT,
--   S INT,
--   M INT,
--   L INT,
--   XL INT,
--   XXL INT,
--   One_Size INT,
--   s7 INT,
--   s75 INT,
--   s8 INT,
--   s85 INT,
--   s9 INT,
--   s10 INT,
--   s105 INT,
--   S11 INT,
--   s115 INT,
--   s12 INT,
--   PRIMARY KEY (style_id),
--   FOREIGN KEY (style_id) REFERENCES STYLES (id) ON DELETE CASCADE ON UPDATE CASCADE
-- );

-- CREATE TABLE FEATURES (
--   id INT NOT NULL AUTO_INCREMENT,
--   product_id INT,
--   feature VARCHAR(40),
--   value VARCHAR(100),
--   PRIMARY KEY (id),
--   FOREIGN KEY (product_id) REFERENCES PRODUCTS (id) ON DELETE CASCADE ON UPDATE CASCADE
-- );

-- CREATE TABLE PHOTOS (
--   id INT NOT NULL AUTO_INCREMENT,
--   style_id INT,
--   url VARCHAR(255),
--   thumbnail_url VARCHAR(255),
--   PRIMARY KEY (id),
--   FOREIGN KEY (style_id) REFERENCES STYLES (id) ON DELETE CASCADE ON UPDATE CASCADE
-- );