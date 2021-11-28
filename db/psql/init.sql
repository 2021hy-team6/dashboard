/**********/
/* SCHEMA */
/**********/

CREATE SCHEMA recm8 AUTHORIZATION usr_recm8;

ALTER ROLE usr_recm8 SET search_path = recm8;

/*********/
/* TABLE */
/*********/

CREATE TABLE recm8.image (
  img_id SERIAL PRIMARY KEY,
  image bytea,
  elapsed_sec float,
  created_at timestamp DEFAULT (now())
);

CREATE TABLE recm8.detection (
  det_id SERIAL PRIMARY KEY,
  img_id int,
  obj_id int,
  score float,
  x1 float,
  y1 float,
  x2 float,
  y2 float
);

CREATE TABLE recm8.category (
  obj_id SERIAL PRIMARY KEY,
  sup_id int,
  name varchar,
  special_instruct varchar
);

CREATE TABLE recm8.super_category (
  sup_id SERIAL PRIMARY KEY,
  name varchar,
  is_recyclable bool
);

ALTER TABLE recm8.detection ADD FOREIGN KEY (img_id) REFERENCES recm8.image (img_id);

ALTER TABLE recm8.detection ADD FOREIGN KEY (obj_id) REFERENCES recm8.category (obj_id);

ALTER TABLE recm8.category ADD FOREIGN KEY (sup_id) REFERENCES recm8.super_category (sup_id);
