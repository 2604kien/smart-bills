--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE "nestJS-smart-bill";




--
-- Drop roles
--

DROP ROLE admin;


--
-- Roles
--

CREATE ROLE admin;
ALTER ROLE admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:WrAtMJO8cPvwjUUDygVjRw==$nNSD5w8d+MvvHVSGOtl3+tP7qPL8VxvoVuknzZ1AWHI=:IGck/9cqXoC9Mb+TVjaDbr2MF7ppUsuS3KpbfeEj+AA=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO admin;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: admin
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: admin
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "nestJS-smart-bill" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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

--
-- Name: nestJS-smart-bill; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE "nestJS-smart-bill" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "nestJS-smart-bill" OWNER TO admin;

\connect -reuse-previous=on "dbname='nestJS-smart-bill'"

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
-- Name: bill; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.bill (
    id integer NOT NULL,
    "totalCost" integer NOT NULL,
    "numberPeople" integer NOT NULL,
    "creatorId" integer,
    description character varying,
    title character varying NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.bill OWNER TO admin;

--
-- Name: bill_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.bill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bill_id_seq OWNER TO admin;

--
-- Name: bill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.bill_id_seq OWNED BY public.bill.id;


--
-- Name: friend_request; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.friend_request (
    id integer NOT NULL,
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    "senderId" integer,
    "receiverId" integer
);


ALTER TABLE public.friend_request OWNER TO admin;

--
-- Name: friend_request_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.friend_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.friend_request_id_seq OWNER TO admin;

--
-- Name: friend_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.friend_request_id_seq OWNED BY public.friend_request.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    "fullName" character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    "phoneNumber" character varying NOT NULL,
    balance integer DEFAULT 0 NOT NULL,
    roles text[] DEFAULT '{user}'::text[]
);


ALTER TABLE public."user" OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user_owe; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_owe (
    id integer NOT NULL,
    "oweAmount" integer NOT NULL,
    "userId" integer,
    "billId" integer
);


ALTER TABLE public.user_owe OWNER TO admin;

--
-- Name: user_owe_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_owe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_owe_id_seq OWNER TO admin;

--
-- Name: user_owe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_owe_id_seq OWNED BY public.user_owe.id;


--
-- Name: user_paid; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_paid (
    id integer NOT NULL,
    "userId" integer,
    "billId" integer,
    date timestamp without time zone DEFAULT now() NOT NULL,
    "paidAmount" numeric
);


ALTER TABLE public.user_paid OWNER TO admin;

--
-- Name: user_paid_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_paid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_paid_id_seq OWNER TO admin;

--
-- Name: user_paid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_paid_id_seq OWNED BY public.user_paid.id;


--
-- Name: bill id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bill ALTER COLUMN id SET DEFAULT nextval('public.bill_id_seq'::regclass);


--
-- Name: friend_request id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.friend_request ALTER COLUMN id SET DEFAULT nextval('public.friend_request_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user_owe id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_owe ALTER COLUMN id SET DEFAULT nextval('public.user_owe_id_seq'::regclass);


--
-- Name: user_paid id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_paid ALTER COLUMN id SET DEFAULT nextval('public.user_paid_id_seq'::regclass);


--
-- Data for Name: bill; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.bill (id, "totalCost", "numberPeople", "creatorId", description, title, date) FROM stdin;
31	12	2	10	smthing	First Bill	2024-04-25 11:07:52.417892
32	18	2	10	laksd;	Second Bill	2024-04-25 11:07:52.417892
33	18	2	10	laksd;	Second Bill	2024-04-25 11:07:52.417892
34	18	2	10	laksd;	Second Bill	2024-04-25 11:07:52.417892
35	18	2	10	alsdk;	2nd Bill	2024-04-25 11:07:52.417892
36	18	2	10	alsdk;	2nd Bill	2024-04-25 11:07:52.417892
37	18	2	10	alsdk;	2nd Bill	2024-04-25 11:07:52.417892
38	18	2	10	alsdk;	2nd Bill	2024-04-25 11:07:52.417892
39	20	2	10	lalsdlkj	3rd Bill	2024-04-25 11:07:52.417892
40	19	2	10	asdlk	4th Bill	2024-04-25 11:07:52.417892
41	20	2	10	kasjdl	4th Bill	2024-04-25 11:07:52.417892
42	0	2	10	lkajsld	5th bill	2024-04-25 11:07:52.417892
43	12	2	10	ksald	6th Bill	2024-04-25 11:07:52.417892
44	20	2	10	klasdk	New Bill	2024-04-25 11:12:45.987261
45	20	2	10	kakskd;	New Bill	2024-04-25 11:35:36.01293
\.


--
-- Data for Name: friend_request; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.friend_request (id, status, "senderId", "receiverId") FROM stdin;
25	accepted	9	51
26	accepted	9	10
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."user" (id, "fullName", username, password, email, "phoneNumber", balance, roles) FROM stdin;
9	Hong Kien Nguyen	2604kjen	$2b$10$59ULJwbiHFicFgglezeFj.TS80Fy9unuB3k/dNqcjZ0GnxeGjZwHi	nguyenhongkien123tk@gmail.com	0932377988	0	{user}
51	BLOL	blol	$2b$10$HPgUszKip/G1uyaw/nw7FO4OhcPOpsoZIg3URaIIvWqGYEwVxVl3i	nguyenhaiphongvodich@gmail.com	0123456789	0	{user}
52	binpro	binpro636	$2b$10$fFtoTces0sQaZRxre2xWsu8PtkUmCpWsr/i3vUlmAg.A9cPwoMjum	kasldkasdlk@gmail.com	0903454409	0	{user}
10	Admin	admin	$2b$10$TXbKa/NbAkw0VO6d6VW1mudzIOnI9BPBiv7.w49U73WmJVuG1Tvou	nguyenhongkien26@gmail.com	0452160479	0	{admin,user}
\.


--
-- Data for Name: user_owe; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.user_owe (id, "oweAmount", "userId", "billId") FROM stdin;
36	7	9	35
37	7	9	36
38	7	9	37
39	7	9	38
40	10	10	39
41	10	9	39
42	10	10	41
43	10	9	41
44	0	10	42
45	0	9	42
46	0	10	43
47	0	9	43
48	10	10	44
49	10	9	44
50	10	10	45
51	10	9	45
\.


--
-- Data for Name: user_paid; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.user_paid (id, "userId", "billId", date, "paidAmount") FROM stdin;
19	10	31	2024-04-25 10:59:23.338162	\N
20	9	31	2024-04-25 10:59:23.338162	\N
21	9	32	2024-04-25 10:59:23.338162	\N
22	10	32	2024-04-25 10:59:23.338162	\N
23	9	33	2024-04-25 10:59:23.338162	\N
24	10	33	2024-04-25 10:59:23.338162	\N
25	9	34	2024-04-25 10:59:23.338162	\N
26	10	34	2024-04-25 10:59:23.338162	\N
27	10	35	2024-04-25 10:59:23.338162	\N
28	10	36	2024-04-25 10:59:23.338162	\N
29	10	37	2024-04-25 10:59:23.338162	\N
30	10	38	2024-04-25 10:59:23.338162	\N
\.


--
-- Name: bill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.bill_id_seq', 45, true);


--
-- Name: friend_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.friend_request_id_seq', 26, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_id_seq', 52, true);


--
-- Name: user_owe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_owe_id_seq', 51, true);


--
-- Name: user_paid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_paid_id_seq', 30, true);


--
-- Name: friend_request PK_4c9d23ff394888750cf66cac17c; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.friend_request
    ADD CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY (id);


--
-- Name: bill PK_683b47912b8b30fe71d1fa22199; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bill
    ADD CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY (id);


--
-- Name: user_owe PK_70452f4538d17ae6d857e398a09; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_owe
    ADD CONSTRAINT "PK_70452f4538d17ae6d857e398a09" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: user_paid PK_9d7df2adae993aa15de04fc0d40; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_paid
    ADD CONSTRAINT "PK_9d7df2adae993aa15de04fc0d40" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: user UQ_f2578043e491921209f5dadd080; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_f2578043e491921209f5dadd080" UNIQUE ("phoneNumber");


--
-- Name: friend_request FK_470e723fdad9d6f4981ab2481eb; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.friend_request
    ADD CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb" FOREIGN KEY ("receiverId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: bill FK_5a40d47aa5bfa7f5f96e809929f; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bill
    ADD CONSTRAINT "FK_5a40d47aa5bfa7f5f96e809929f" FOREIGN KEY ("creatorId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: user_paid FK_5f431d04fdfcbe8896e95fa52e1; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_paid
    ADD CONSTRAINT "FK_5f431d04fdfcbe8896e95fa52e1" FOREIGN KEY ("billId") REFERENCES public.bill(id) ON DELETE CASCADE;


--
-- Name: user_paid FK_7105bb8903884c04320ffb89cb9; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_paid
    ADD CONSTRAINT "FK_7105bb8903884c04320ffb89cb9" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: user_owe FK_92fbffa8047387d68905f2e39d7; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_owe
    ADD CONSTRAINT "FK_92fbffa8047387d68905f2e39d7" FOREIGN KEY ("billId") REFERENCES public.bill(id) ON DELETE CASCADE;


--
-- Name: friend_request FK_9509b72f50f495668bae3c0171c; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.friend_request
    ADD CONSTRAINT "FK_9509b72f50f495668bae3c0171c" FOREIGN KEY ("senderId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: user_owe FK_afcd031d0c48c9c39df143303c2; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_owe
    ADD CONSTRAINT "FK_afcd031d0c48c9c39df143303c2" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO admin;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

