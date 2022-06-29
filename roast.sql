--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-04-29 16:47:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16447)
-- Name: commentation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commentation (
    comment_id integer NOT NULL,
    recipe_id integer NOT NULL,
    comment_text text NOT NULL,
    user_id integer NOT NULL,
    public_view integer
);


ALTER TABLE public.commentation OWNER TO postgres;

--
-- TOC entry 3330 (class 0 OID 0)
-- Dependencies: 210
-- Name: COLUMN commentation.public_view; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.commentation.public_view IS '0 = non_active
1 = active';


--
-- TOC entry 212 (class 1259 OID 16456)
-- Name: comment_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.commentation ALTER COLUMN comment_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comment_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 16440)
-- Name: recipe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe (
    recipe_id integer NOT NULL,
    photo character varying(255),
    title text NOT NULL,
    ingredients text NOT NULL,
    video character varying(255),
    dates date NOT NULL,
    user_id integer NOT NULL,
    public_view integer
);


ALTER TABLE public.recipe OWNER TO postgres;

--
-- TOC entry 3331 (class 0 OID 0)
-- Dependencies: 209
-- Name: COLUMN recipe.public_view; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.recipe.public_view IS '1 = aktif
0 = non_aktif';


--
-- TOC entry 211 (class 1259 OID 16455)
-- Name: recipe_recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.recipe ALTER COLUMN recipe_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.recipe_recipe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 214 (class 1259 OID 16458)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying(25) NOT NULL,
    email character varying(30) NOT NULL,
    phone character varying(20) NOT NULL,
    password character varying(255) NOT NULL,
    photo character varying(255),
    level integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 214
-- Name: COLUMN users.level; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.users.level IS '0 = admin
1 = customer';


--
-- TOC entry 213 (class 1259 OID 16457)
-- Name: users_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3320 (class 0 OID 16447)
-- Dependencies: 210
-- Data for Name: commentation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.commentation (comment_id, recipe_id, comment_text, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (15, 41, 'i like it...', 47, 1);
INSERT INTO public.commentation (comment_id, recipe_id, comment_text, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (16, 43, 'good job', 47, 1);
INSERT INTO public.commentation (comment_id, recipe_id, comment_text, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (17, 39, 'nice...', 48, 1);
INSERT INTO public.commentation (comment_id, recipe_id, comment_text, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (18, 40, 'amazing...', 48, 1);
INSERT INTO public.commentation (comment_id, recipe_id, comment_text, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (19, 38, 'awesome...', 48, 1);


--
-- TOC entry 3319 (class 0 OID 16440)
-- Dependencies: 209
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.recipe (recipe_id, photo, title, ingredients, video, dates, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (36, 'sateKambing.jpg', 'Sate Kambing', 'daging kambing', 'https://www.youtube.com/', '2022-04-04', 47, 1);
INSERT INTO public.recipe (recipe_id, photo, title, ingredients, video, dates, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (43, 'baksoIkan.jpg', 'Bakso Ikan', 'ikan segar', 'https://www.youtube.com/', '2022-04-04', 92, 1);
INSERT INTO public.recipe (recipe_id, photo, title, ingredients, video, dates, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (83, '1651111623269.jpg', 'Soto Ayam', 'Daging Ayam', 'https://www.youtube.com/', '2022-04-28', 92, 1);
INSERT INTO public.recipe (recipe_id, photo, title, ingredients, video, dates, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (84, '1651111657661.jpg', 'Gurame Bakar', 'Ikan Gurame', 'https://www.youtube.com/', '2022-04-28', 92, 1);
INSERT INTO public.recipe (recipe_id, photo, title, ingredients, video, dates, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (85, '1651111726534.jpg', 'Mie Ayam', 'Mie', 'https://www.youtube.com/', '2022-04-28', 92, 1);
INSERT INTO public.recipe (recipe_id, photo, title, ingredients, video, dates, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (86, '1651111984069.jpg', 'Gado-gado', 'Sayur-mayur', 'https://youtube.com', '2022-04-28', 92, 1);
INSERT INTO public.recipe (recipe_id, photo, title, ingredients, video, dates, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (87, '1651112087837.jpg', 'Salad Buah', 'Buah segar', 'https://youtube.com', '2022-04-28', 92, 1);
INSERT INTO public.recipe (recipe_id, photo, title, ingredients, video, dates, user_id, public_view) OVERRIDING SYSTEM VALUE VALUES (81, '1651119218730.jpg', 'Nasi Goreng sosis', 'Nasi', 'https://www.youtube.com/', '2022-04-28', 47, 1);


--
-- TOC entry 3324 (class 0 OID 16458)
-- Dependencies: 214
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (user_id, user_name, email, phone, password, photo, level) OVERRIDING SYSTEM VALUE VALUES (46, 'Roger', 'roger@gmail.com', '12312345', '$2b$10$e/GoqVgDXptu9QcMgpD4Wej5hrH8x0W8lHIQYf0CGviODyLWTkB7q', 'roger.jpg', 0);
INSERT INTO public.users (user_id, user_name, email, phone, password, photo, level) OVERRIDING SYSTEM VALUE VALUES (47, 'Vinsmoke Sanji', 'sanji@gmail.com', '123123456', '$2b$10$jyXEEfMRJnNcMKE98MissOKz81h2JlnyflAINuOiO8fiRR3kcaY8S', 'sanji.jpg', 1);
INSERT INTO public.users (user_id, user_name, email, phone, password, photo, level) OVERRIDING SYSTEM VALUE VALUES (92, 'Roronoa Zoro', 'zoro@gmail.com', '1212121212', '$2b$10$htpTJ.9s.sD7hCQPfgG7uubgUVXJI4wg42FyqIDn3IkzI11PPKCgq', '1651061427937.jpg', 1);
INSERT INTO public.users (user_id, user_name, email, phone, password, photo, level) OVERRIDING SYSTEM VALUE VALUES (99, 'usop', 'usop@gmail.com', '111111111', '$2b$10$NS9hTyHhTLhvpGq2zm0T7.exMQMJXvMBDyBIBq.Mb7rTs3xDivVSK', '1651118833794.jpg', NULL);


--
-- TOC entry 3333 (class 0 OID 0)
-- Dependencies: 212
-- Name: comment_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_comment_id_seq', 19, true);


--
-- TOC entry 3334 (class 0 OID 0)
-- Dependencies: 211
-- Name: recipe_recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipe_recipe_id_seq', 87, true);


--
-- TOC entry 3335 (class 0 OID 0)
-- Dependencies: 213
-- Name: users_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_users_id_seq', 99, true);


--
-- TOC entry 3177 (class 2606 OID 16453)
-- Name: commentation comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commentation
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3175 (class 2606 OID 16446)
-- Name: recipe recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (recipe_id);


--
-- TOC entry 3179 (class 2606 OID 16462)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


-- Completed on 2022-04-29 16:47:21

--
-- PostgreSQL database dump complete
--

