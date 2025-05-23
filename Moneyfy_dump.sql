--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.2

-- Started on 2025-05-23 14:08:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 32768)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 24583)
-- Name: account_types; Type: TABLE; Schema: public; Owner: Moneyfy_owner
--

CREATE TABLE public.account_types (
    type character varying NOT NULL
);


ALTER TABLE public.account_types OWNER TO "Moneyfy_owner";

--
-- TOC entry 220 (class 1259 OID 24600)
-- Name: accounts; Type: TABLE; Schema: public; Owner: Moneyfy_owner
--

CREATE TABLE public.accounts (
    account_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    name character varying NOT NULL,
    balance integer DEFAULT 0,
    type character varying,
    updated_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.accounts OWNER TO "Moneyfy_owner";

--
-- TOC entry 223 (class 1259 OID 24647)
-- Name: budgets; Type: TABLE; Schema: public; Owner: Moneyfy_owner
--

CREATE TABLE public.budgets (
    budget_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    category_id uuid,
    amount integer,
    start_date date,
    end_date date,
    updated_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.budgets OWNER TO "Moneyfy_owner";

--
-- TOC entry 221 (class 1259 OID 24619)
-- Name: categories; Type: TABLE; Schema: public; Owner: Moneyfy_owner
--

CREATE TABLE public.categories (
    category_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    type character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    icon_url character varying,
    CONSTRAINT categories_type_check CHECK (((type)::text = ANY ((ARRAY['income'::character varying, 'expense'::character varying, 'saving'::character varying])::text[])))
);


ALTER TABLE public.categories OWNER TO "Moneyfy_owner";

--
-- TOC entry 222 (class 1259 OID 24633)
-- Name: savinggoals; Type: TABLE; Schema: public; Owner: Moneyfy_owner
--

CREATE TABLE public.savinggoals (
    goal_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    title character varying NOT NULL,
    target_amount integer,
    current_amount integer DEFAULT 0,
    start_date date,
    end_date date,
    updated_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.savinggoals OWNER TO "Moneyfy_owner";

--
-- TOC entry 224 (class 1259 OID 24663)
-- Name: transaction_types; Type: TABLE; Schema: public; Owner: Moneyfy_owner
--

CREATE TABLE public.transaction_types (
    type character varying NOT NULL,
    CONSTRAINT transaction_types_type_check CHECK (((type)::text = ANY ((ARRAY['income'::character varying, 'expense'::character varying, 'saving'::character varying])::text[])))
);


ALTER TABLE public.transaction_types OWNER TO "Moneyfy_owner";

--
-- TOC entry 225 (class 1259 OID 24671)
-- Name: transactions; Type: TABLE; Schema: public; Owner: Moneyfy_owner
--

CREATE TABLE public.transactions (
    transaction_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    category_id uuid,
    amount integer,
    date date,
    note text,
    transaction_type character varying,
    goal_id uuid,
    updated_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.transactions OWNER TO "Moneyfy_owner";

--
-- TOC entry 219 (class 1259 OID 24590)
-- Name: users; Type: TABLE; Schema: public; Owner: Moneyfy_owner
--

CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    updated_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    profile_img_url text
);


ALTER TABLE public.users OWNER TO "Moneyfy_owner";

--
-- TOC entry 3414 (class 0 OID 24583)
-- Dependencies: 218
-- Data for Name: account_types; Type: TABLE DATA; Schema: public; Owner: Moneyfy_owner
--

COPY public.account_types (type) FROM stdin;
bank
digital_wallet
cash
\.


--
-- TOC entry 3416 (class 0 OID 24600)
-- Dependencies: 220
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: Moneyfy_owner
--

COPY public.accounts (account_id, user_id, name, balance, type, updated_at, created_at) FROM stdin;
5ac0f577-e2c3-41b5-9e87-b50ef87f377c	efb2f725-ca32-4dd8-b288-2fd07019d3f2	John's Updated Account	200000	digital_wallet	2025-05-12 05:36:32.348683	2025-05-12 05:33:46.219449
0f52beee-4583-442b-b17c-86980f3f9838	efb2f725-ca32-4dd8-b288-2fd07019d3f2	John's Bank Account2	100000	bank	\N	2025-05-12 05:43:27.667136
1896aecf-02d6-4c70-82df-87a3f3671b36	74b728fa-8768-4fc5-b745-27b370794d1a	Ikhsan Bank Account	25430820	bank	\N	2025-05-18 10:13:13.238258
16dc7e00-700a-4e37-a587-2fde21a7ec16	97646a48-c8de-4a76-81b3-9b47524d2a9a	Wiellona	200000	digital_wallet	2025-05-20 15:15:23.13464	2025-05-20 15:15:03.19107
d5406b2e-d942-487c-8b05-663d3eee4a6d	97646a48-c8de-4a76-81b3-9b47524d2a9a	Main Account	200000	cash	\N	2025-05-23 03:50:58.049684
6593ac74-a852-46ea-b8dc-d3046eeb4263	74b728fa-8768-4fc5-b745-27b370794d1a	Main Account	12000	cash	\N	2025-05-23 07:01:47.485823
eed847a6-aa17-48b4-b4ff-7254c53d25f4	74b728fa-8768-4fc5-b745-27b370794d1a	Main Account	1000000	cash	\N	2025-05-23 07:02:02.728815
\.


--
-- TOC entry 3419 (class 0 OID 24647)
-- Dependencies: 223
-- Data for Name: budgets; Type: TABLE DATA; Schema: public; Owner: Moneyfy_owner
--

COPY public.budgets (budget_id, user_id, category_id, amount, start_date, end_date, updated_at, created_at) FROM stdin;
204b8d28-f882-46b2-a34a-0c9fe7583d8b	efb2f725-ca32-4dd8-b288-2fd07019d3f2	2bff810e-d6ad-4020-9d13-594e3b327a43	500000	2025-05-01	2025-05-31	2025-05-15 01:58:06.286	2025-05-15 01:54:31.345
d3b065a6-49c1-4f4d-8103-8bdde3d72585	74b728fa-8768-4fc5-b745-27b370794d1a	4849327e-c6fd-4c87-a781-bddf023eb32d	100000	2025-05-01	2025-05-31	2025-05-20 17:30:25.079	2025-05-20 16:23:23.531
5374854a-cee0-4dc2-b171-71ce79e6833a	74b728fa-8768-4fc5-b745-27b370794d1a	9f8cb61f-6c3c-4cd4-9ccc-84c4089a1b47	520000	2025-05-01	2025-05-31	2025-05-20 19:04:35.016	2025-05-20 16:24:19.899
cad54750-69f2-4a80-809e-121d4c30d4cf	97646a48-c8de-4a76-81b3-9b47524d2a9a	ce619f09-47c8-4ccf-a037-72eb3a6f1bea	200000	2025-05-01	2025-05-31	2025-05-20 21:37:54.323	2025-05-20 20:40:40.193
46221652-f453-4a29-a11a-5be1936f64b4	97646a48-c8de-4a76-81b3-9b47524d2a9a	2bff810e-d6ad-4020-9d13-594e3b327a43	500000	2025-05-20	2025-05-31	2025-05-23 10:42:50.77	2025-05-20 20:39:23.1
42f85f75-8bd2-422b-986c-a711004b7003	97646a48-c8de-4a76-81b3-9b47524d2a9a	28544b3f-5837-470d-94cd-b3915b767198	100000	2025-05-23	2025-05-31	2025-05-23 11:42:23.874	2025-05-23 11:42:23.874
6da78666-0ef8-4b51-8072-58fadd94cce0	97646a48-c8de-4a76-81b3-9b47524d2a9a	4849327e-c6fd-4c87-a781-bddf023eb32d	1000000	2025-05-20	2025-05-31	2025-05-23 12:38:11.726	2025-05-20 20:38:08.02
\.


--
-- TOC entry 3417 (class 0 OID 24619)
-- Dependencies: 221
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: Moneyfy_owner
--

COPY public.categories (category_id, name, type, created_at, updated_at, icon_url) FROM stdin;
10cb741d-41a2-4a00-bed9-bd1e8522e2c4	Freelance	income	2025-05-19 14:43:13.761	2025-05-19 14:43:13.761	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAR1JREFUSEvt1bFL1WEUxvHPg9DQFDiJg03SWsPdGnMT3BIENyGnFh11cWxxSnBoEYIWpdn+AIOQ8C+IaDYVRNDhdH8Xb0jcvKZeaLgvvMt7zvly3uec97wxwJUBsl0Lr6oVvMZojyTOsY35JBe9kvwrvKrG8eMGN5tL8v5f4S18xm6SqT+Dq2oJb7CaZK0vvKoeo9nNeoINfMFyj+CXeIV32Lq0nyTZ7/r+lqWq3mLxBjL0c/mKVlOHDryqHuAMTWH2+kVfY5/EGF4k+dSFP2p3xU98TzJxW3hVbWIBs0k+DOEdJYey9GyooSz/jywP25PvFMdYv+3zxzSeYSbJx6tTcac5vAO4G/oNT5McXYWP4Pk9wA+SHDacgX7QvwBIdKwYxLr7XwAAAABJRU5ErkJggg==
9f26e634-b01a-4112-86be-6aad9a61de5c	Bonuses	income	2025-05-19 14:44:55.455	2025-05-19 14:44:55.455	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAZRJREFUSEu1lUsrRVEYhp9XUYxIbkViSEgpdUYM/ASXmCAyNcBEmTAiE6VEZ2DIjB+gJMklRVEmLgO5TAxEmfisddqntks6tn3WZE/2eta73u/9viWyuJRFNim4mRUCTzEe1CNpLfvwtGIzqwaugVNJTZnexMzmgDFgRNJyet8nz3+Dm1kJUO8Ad5IuwgfHAe8E1oGkpKFY4GZWBEwAw0Ax8AYsAuOS3oNARLPFzA6BlqAWN055FVALTDv4VGS4mTUCJ8AR0OqVmllpYM+tpL7/wOuAM2fBC7AA7DiLXoFjSc+hlEW2JQkMfomlP2BU0kpk5SFlCaANyANygAGgEkhI2osURTOr8I3hkuL9TakMlM4Ak75xJM1HhecDV0AZcADsAt2An0UF/jaStiPBA5UNwAZQ88X3lOo4PM91Smd9EYF9oFfS5b/TEgL4WHYFMdyMpf0zmYyZel7upx7wACxlAg7+6fCxdCOiX9LqjyM3KM4W0P4HcPrXe1f4Zkn+m1rf3lAz843iVfx1nUt6DG/K6gP9AR/QCieswGluAAAAAElFTkSuQmCC
147e4324-8b92-4cc5-8127-f8e403fbea73	Salary	income	2025-05-14 18:18:28.52	2025-05-14 18:18:28.52	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAWdJREFUOE+tlL8rxVEYxj9PJIuYyKAolAmLLMKiDAY/FkpEGdzI/+APkJLFQikKg83EYrnZMJBFJjHYFY/vV+erm+51HTnb6bznc877Ps/7in9eiuXZrgG6gXNJ79/v/xpoux+YASaBaqBH0kUU0HYjMAvMAa3h8hNQD/RJOi8LtF0BjADzwDCQ7u8S4C6wA4wCa2WBtluARWAaaAgv3wDbCThf8JMJIAcsA1fAW3ou6TWN+ayh7fZwWBUrUoh/DjW9z4DjwCFwBFxHQpuDWAuStjJgmsYBMCVpLwZoewA4A5YkbXwHTkraLwW0PRTqV1sQUwd0RgODoV+C6sXeLPrDkinbbkr8+ACsS1rJiOVS/ndgyRraTr35GDx5UpBzpvKfRDkFBkuIFlfDH5QvapuxYOpVIP1FzOoKvZ2TtJn5sC0ZS7dZK8bQCmJ7JeW/5qHtjqSf0xasjASmw+FY0uXXcIgE/Bj+AcGinhVV2UT/AAAAAElFTkSuQmCC
3e136ccf-c709-461a-96d8-b6e7ddfc9ef8	Investments	income	2025-05-19 14:46:06.907	2025-05-19 14:46:06.907	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAZVJREFUSEvFlb8rRWEYxz9fAwNlMFwMisIkUkJhJHQvhTIp5Q7EYrb4A0wGA5mVovzIjw0ZLJKkZDTIYJIyeZy3zq3b7Zx7zvEjZ36fz/t9v9/neY74w09/yOb/4WaWBqYkTZjZDNAmaT7q1YHKzawc6Mgr7gb6gWVgGKgHFiQ9F7sgDN4K3EQpA7b9F30EnQ2DNwCbQKWzwFP5CtzlAUqBTqDEe+EhkJH0WXhB0UDNrBc4B/YkjeQXm1nKg14DtUCXpKtfgzuQma0Ai0BW0kZSeB9wBuxLyhQWm9mJH3Ra0kFSeA9wAVwCSwWeZ70cxoEXoFHSW1J4TnmxxlmTNBe7W3IH8wJ9ALYKAI3AGFDmd8t+UuWh3eIHOgrsem15JGkoKTwq0ArAef0kqS4pPEq52zPrwKmkgVhwf0BmvSl1aqaBIM+bgUkfOCjpOC68BbiNsVucJYtBA+Rqw3aLG22nPPc1ecG5ZeYWVTtQDawCO5Lew0TE+ln86j4PGPMqICXp3sxqgApJj1G2xVIeBfmRLd+FfwGJF5AYzFfRFAAAAABJRU5ErkJggg==
2bff810e-d6ad-4020-9d13-594e3b327a43	Food & Drinks	expense	2025-05-14 18:19:22.795	2025-05-14 18:19:22.795	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAARRJREFUOE/tlT1KQ0EUhb9DCiFlILgAQUjhEoRAigRBCytjEyzUDWgKW9PpAkSbVFr6k15IkV60cQOCCAYEbT15Ay/wSF7EkAcW8VbDDPPdnzn3jsjYlOTZLgGLQBcoACvAs6RX26vAh6TH4R3by8CLpK/h3ijwKgJsAQtAFbgDdiS1bX8CPUlV2/n4rAJcR042ZwUeACcxpCupPCvwDNjPEnge1W73T4CXQB1oAUvx+hZ4AI6Ae0k127+OsA00fpBmR9LGNMBQl+B9kh1KOp0GGHR5DOwBxQS1D1yEtCV9216LdZgLTTBRNiNds54UdlrItt+Bp39g+oPansMahuG5DdxICq03ZrabwFuYl6njK4vfYABNXt0V3f7qVgAAAABJRU5ErkJggg==
2a5a6747-fb25-4981-8eb4-b17f84a93bfa	Selling stuff	income	2025-05-19 14:47:25.503	2025-05-19 14:47:25.503	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAdlJREFUSEvF1UuoTWEYxvHfK7kWITNJIuVSzMmUFMqtKKWOOqUQJkwoExNTSq4pA0aEiYmJUpgouQ3kcigkIyG81ldr12639zlr0+msWpO13u//Pd/7Ps9aYRSvGEW2xvDM3IKrOBcRA01EjR08M8djG9ZjDabhF+7iFi5GxNdep+ipPDPn4AZWDNOC99gQEQ+71QwHL+pW4w0OYyLO41JRjONYiXdYEBE/OjfoCs/MeXhVQcuCRRHxOjM341proJk5CQ+wFBsj4npT+EK8qPr9NCIWl0Wd8PrZ/Oo0c/EyIoaawifgI6ZjD05jU7vy/7JiZg7W0MJ5VrdpbTXgcvytEfFzpA2G9XlmFhuewswO0DfcwYmIuN+3FVsLMnNW1dMdtTNKSj9jSn3/qdwyEBEX+rJiZ3H7QLGven8Mh/C9DDUiPjUaaDcVPdxys7LjOuyMiMuN4Jk5A18wFBElqb2sWEK1q6rbXdWdbQSvYY+xDFdwAKtaVqw23ouD1Z5H8btO6Nt+4Mtxrx5cAZSQlMCUgU7F5HIgDEbEmb4HWn+8jlRp3V4Hqp3xpHbKv1uxbtE47MdJ3K7b8SgiivKe19j9LNolZebsaqBL8CEino8U/fK+sfImsM6av5jzqRhTdIuYAAAAAElFTkSuQmCC
e0450520-99bf-4c0d-bb92-5788980cb0f4	Cashback & Rewards	income	2025-05-19 14:47:53.844	2025-05-19 14:49:40.29	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAo1JREFUSEu1lVmIj2EUxn+PJUvEBWVIItkjI7JcyDaSmqREolC2G0poci8JSa4o3CCjFAlFyoVMJGu2spQty5RyIWJ6vKfev76Z/5j5E9/V973Lc57znOecT/zHR/8Rm1bBbfcETgGzgA7tEHgMLJV0u+W534EfBlYCTUDHCrJ7AYyU9K14tgzc9njgFvAFGAq8A14BA4DRwMX8PkrSI9vXgUlAnaSd7YE3AJOBbZJ22J4JXAZuS6q2vT32gJ2S6myPA+4An4OMpI+lAM2Y214EnARe5oPfbR8BVqTLmyTttT0YeA68AQZKsu2SjAclrS0Dt90FeAIMSrLUSjpruysQTLoBVSVWtm8AE4HZki7b7gs8A3oAYyQ9jAC/mNveGqnmAOty9KlAyHAP2FjQc2livho4DezL6/Ed65ck1bQEvx9RK3BGJUf6SmosMj+UtF6Vb17NNqwChgEfgEcF1H7AcKAReJDXq4Hoj6fACElNRfDOScMADVvtl7TB9ljgLvBa0sASuO0DwBpgi6TdtucCF7JjqiVFwZt3aC5MgAXj5ZKOJgcFs1HJ31MlNSQrBon3QG8gMugDhNe7AzVR4FatGIu5icLr0fYzgOm5qKVsaoEzwJVU6IU5s8hqs6Q9bTZRDrA46XYiOeQTMD8xupZ17w8cS/rH/vqk77Lkjmmp9eslLalotuQAu4INEJ79CkTBgunxPG/Opc5cEJ0LTGk5V8o0L0a2HbKcB6JYP4BOec6EzqXvt8AESTF/yp4257ntXnmIDWnlbkzAYFw2an9b0JYgtsPPN3NrF7eXSKpvq6Mq+hOlsTovzZLQuHR+t6Qt7bVqReC5wHOyQ8KCYUv/M/D2gP64oH8DWLzzE6Lc2xhfjdPrAAAAAElFTkSuQmCC
b69f4de8-9b95-4f3d-b893-fbaafdfe3d13	Other	income	2025-05-19 14:50:19.117	2025-05-19 14:50:19.117	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAglJREFUSEvtlE9oz3EYx19vllDGwRy0zLggtIv8WY12oB22i3EQLZKbkrLFUVHCwW07LAfkMH/KwWXbZRKShDJtop38OxAlfw6P76Pntz6+v9/2tdUOyqd+/b59nufz+nye9/NHzODSDLL5D6+obqEsZrYAWA3MTwg/gVeS3kyWszK4mS0EWoD1QCuwdhLA+8x+LfN7BAxKGkt9/4Cb2U6gG1icOH0DhoHPyd6ciGZRsvcDOAmclmS+Pw43s6PA+XAeiUtuAyMl53wEZrYUaAIOA1vCfkXS3jz8CzAXOCDp0lTr38wagZtADbBG0vDvl4fOnwCXoF7S22nAZwH3gQ1Au6TrJbhr9zGAL0K7G5K+F11iZs7YARyJfz+yW1JfJXiJ9wEYAEY9uAkuqQW2AStz9opwL6Uu1x3YXvTqxO7VdBFYB+yb6OVjkpabmTs9jd8FYJknCdgFPAZuZTJ4jhqADuCYpHNm1gMcysM9Ge48D2iOb4cPSdoaSW8H+oBeSQdj77jXtcOBq8DdLII6YJOkB2mdnwE6I9R7wGbgjiSvY6+oSvATwKmIxqOtAh4CG703UrgbzkZDzE70fA08i4bzcfAkC/s5sCo09nOl5U23X5KPhfJ5bmZLsq7cA7TF4XQU5HP8NfLSD1yW5J09vv5mKlbHHFkRer6L8nxZ1GyF8CmUY5nrvwv/BZtNqhiQw8t2AAAAAElFTkSuQmCC
9a97499b-69bb-44b2-ab75-4c11efa9a197	Transportation	expense	2025-05-19 15:05:55.356	2025-05-19 15:05:55.356	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAcNJREFUSEvFlD9IVWEYxn9PggSJbkKEEMFNB2mQKCgsoq3BhnJNBLGrRI0RRBTh5CAUEiIuBQ3VUkFjU5QikU79IShCinATCgrx6XzwXbler+d8V5C+5cDhOb/3+Z7zvq/YwaMdZLMl3PYRYC6h+A1Jt+vp/g+81ontfuARMCNpKOFGubE0AYeAtgg6mT1vAi+A8fjuL7Ag6XdyLLZPAw+B9gSHf4BrkiZqtXUzt/0tu34H8A5YKSjQC+wCSpI+V2s3wW3vA5aAj5K6ipzbngRGgQFJ94vgncAHYF5SaMfcYzu04XXgiqQ7RfAS8CkWGCmCA4PABeCypLtF8IrzBO4GSZLzgyFv4DswnVDhFHAiNZYNmdsuA4uS3lQK2d4T43iamRhuJPN1OHA1c/USeC6prwp+CQj5jgHeFjx0i+1bwFtJz6rgYQYuAo+B843A92c9+2UbmZclTRV1S5i218DRhJ9ZkSwDPdlCC8O3frYa/92xd88CZ3KKhHmYAR5I+pG0W4LIdmscpL058DXguKTZ5K0Y4U+Ac8C9uMdrvz8QXX8FuiX9SnJuuxk4FsWvJK3Wc2b7MNACvJf0MwnewI/Mlf4DB9elGJGaiw4AAAAASUVORK5CYII=
f391d328-648d-4be9-b22d-4ac68d663510	Shopping	expense	2025-05-19 15:06:29.897	2025-05-19 15:06:29.897	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAU5JREFUSEvt1a9rVnEUx/HXB1zUYHGgcaLGIaxMsCpi1qRJWBE0aDCsWWz+wmbQ5D+gzSBiEDGIFpsoGJx5hsHx+c77jLnd7XmeyYrswIUL33Pen8/3cM69sYuRXWQbCa+q/biC6ziCX7iPh0m+bGduW3hVTeElTvVAfuBkkq9bCYyC38ENfMBNvMExLOI8XiU5PTG8qg6guWsxs95hd6NPOIr5JE10U2zpvKpm8b65TTK/sXIgcBu3cC3J3ZHwqjqBQ13i8cH7I7zrWrOx/gIW8BhPu8OVJK+HiWvOuzb8xL5/HM9zSZ43xnr4NL5jGW93IDCDw7iUZPUmffDPSdpETBRVdQ9XcTnJkz34avv22tI7Rf9vWw4OlqCtf3seTLRBf5LPYg4Xkzz7a4m6cXqBMzsAD0u+YTbJUh+8fbT6/jrj6n0cgjfBxyWMm/cbew6qGMKCJX4AAAAASUVORK5CYII=
0c295ce3-7111-4a96-bc3e-b1f33207d03a	Subscription	expense	2025-05-19 15:07:01.112	2025-05-19 15:07:01.112	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAUBJREFUSEvdlc0qRWEUhp+XKEyUmfI3NzJXkgswIRk4d2B25Gek/JSfUpQbUJJTJqRcgXITjozJQBjodbb2Njj2YX/HPqnzjb/1tNbzrbU+0cCjBrJpArjtArAKDASoegNKQEHSe3XcpxbbbcAT0AJcB8D7gSFgVtJxLXg38AiUJQ1mhdteAjaAoqSdJM52h6SXJPMEficpsxbbK8AasCBp23ZU+RZwI+kkNzhwCJwBE8BMGjxUyyKwCRwAY5XHHY7VTEkq5ZV59TOlZl6v8/+HhzpPWvEidt4VlzAt6fSvzpeB9ajPgXPgCuir1S2hzr/g0RDZ7gEugd08WvHbhNpuB3ol3SZaOiulPcf7ZS/r+AOjwDgwL2k/dbfEyyuarskAcHL1ARiRVP4J3grMBa7cV+BI0n1aUk3wE9Xh+teQD0mAphi7bAOBAAAAAElFTkSuQmCC
f248dfcd-e42c-48e2-8186-e586973b7ee9	Bills	expense	2025-05-19 15:07:37.992	2025-05-19 15:07:37.992	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAPlJREFUSEvd1aGKAlEYxfH/UbaYrCabcUGr4BOsYBLLuslqsVp8A4PJtGHLYhBfQqy+gdi26O6KwfTJiIrKHYS5M0EnznB/HL77cUYk+ChBmyfAzewD6AF5j1FtgE9J7cA4jMXMXoA/IAXMPPACkAPKkqYnPAusgaWkyMnNbAi0gIak71v8J/jgkbwDvAF1SaNb3MO9OupM/rj4LqZtcc480W054Gb2ClRcFyBpEHYx91bxEp87kC9J73Hg9ZDkXS886j6GjSUDbI/90o+KA1WgBNQkTc59bmbj4KUHfDq6AIqSfi/xNND0rNz/Y+WuzpUbQ1on8bi/uT1gn4UYfgKIWgAAAABJRU5ErkJggg==
ce619f09-47c8-4ccf-a037-72eb3a6f1bea	Entertainment	expense	2025-05-19 15:08:05.522	2025-05-19 15:08:05.522	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAiFJREFUSEu1lc2LTnEUxz/fyEvIRiGvE6XGTiY2FFl5L42ZJqVRbGRhZWXnDxArFkhpMINhJlkY8pZI2VlMRMpCipot+rpH55nuPDPmPp5pfnW7Pc+993PO+f6+5/zENC5NI5tJ4baXA++Ar0Av0C/pdaMJVcG3Ak/qYJ+BO8At4Lkk/ytYFXwL8BR4BTwEDgGrSrBvGeg2MCTpVzlQo/B7kvbFh7Y3AO15rSnBRoABoAe4HxX9N7ycWQbqyEAtpWc7JA1VwWuaD0jaO9lG2t4InAc2Ax2SbjYKH5S0p8olti8CR4FOSTfGwW3PBVqBj4X91ueGjmpekf0F4Fhh34OSesfAbXcVbrgMzEpI2G4lMDV4gq8l9D2wFJiXv6cMDxlWA12SemzPyUbZOaXMbc8EfgIjkhbWdLUd3u4H+iSFt8cs2wuAXcCKbLTDwJFxmtsOKaIptkt6bP/tgavZlaclnanzeFT5oGiadRNs8tgNtX0COJcVBDScEp6NzmuV9KVU0XzgLbA2B9sQsBuoNVK7pL5Rt2Smkd0pYEaCPgDdkp7VZb0NeFQA30hqy7EwG4j3l01oxXxpEXAgfR7D6PcEWncXFr0EnJV0slRRzJVOYL+ku00dFrZDrpeFs4aBNkkjtpekVHFvkfSpWXjI9gLYlBUOhhTA4rJtm4KnfNG5V4rDJPSvrevAcUnf44+m4SWdo5Mj0LCkHw0fFlVTsOr5H2qA3xiLiUwCAAAAAElFTkSuQmCC
b4e56260-5b77-4eee-b452-80c33e57cc2d	Health & Wellness	expense	2025-05-19 15:08:33.619	2025-05-19 15:08:33.619	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAWVJREFUSEvVlT0oxVEYxn9PymBSMsjAJDEx2NjYlMVHKaUoJguTWJTFYqIUi1IMxEqKiRKy2SRl81VSDI97dP+6bvfrj1ucOss57/vrOe/znnNEEYeKyCYn3PYUMAZUZBDxCmwCA5LeMonMCrddDdwUcLJ+SWtx4S3AMbArqSM92fY4MAdMS5rJC7ddC4QZRj2wCJwAExmSe4ERYAVYTe4/STqNYj/LYnsBGC2gDPlCzoGW4MMH3HYp8AIEY47yZefYrwOqgHZJexG8PNEV98C1pJrvwm0vAcNAn6T1guG2K4FG4FbSZSYBP4F3AxvAsqShvw23Heo/mFTZAAT1Z8BOcu1Q0n50ilhlsd0GHOQweDbRcpPfhRdPeapi2//I0DTlwdAe4FRSZOgXO2IZGvemZoOXJV6+Z+ARmI8LTYnvTLRpM9AlaTv1VdwKiz8AR6lXQJOkh1R4CdD6C/ALSXeBU9QP+h3Ov90YmgYOMgAAAABJRU5ErkJggg==
28544b3f-5837-470d-94cd-b3915b767198	Gifts & Donations	expense	2025-05-19 15:09:21.551	2025-05-19 15:09:21.551	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAihJREFUSEu1lEuITmEYx3//RKFcConcS2HYuJTFkCmUIixZWCHKgoWVsmHjUmzYKBZkRS5JsRhkQWSjBrNQMyGNW5NcVv7O8/V+4/jmfN/5zmLeeut0znt+z/P8n//zihFcGkE2bcFtLwZOAF3AG+AJsA6Yn56PSHrUmGgp3PboBJzXosrvwAJJn/Jn2oGvAJ4BL4DVKePDwGXgEnAT2AzskHS1KnwW0A9EVh2SBuoA2+NT0IXA2kZpSjMPkO1bKbtXkb2kQdtjgPvAGqAnBXalzBN8GvAAWAQ8B9YDV4BNQFQSWb+u3NCcBFMzSDewBBgEJiZwp6Teoma3JUsuwJRUQQR4H5JIetvMRf/Bbc/NHBC7aA1I6rE9GTgWvpfUl2TrAD5K+lyoue1zwL6SiT0pKWxYW7YnAReBrcBv4EZYVNKd+F7L3PY44EfS8kyTAHuB6cAySS9th/+vAbOTVScAESxWl6TuOjxefgP6JBXKYvsQcDoBY9RPATG994CdyT0bki1XZhX+bAq3PTNr2u5cFWOBIUmi4GwfTfqfBQ5k+wuwvN6LRni/pDlJqlXA0yYSfQW2S3poO/oU/fqV3BNzUFutMp8B7GkCvyDpne2NwN3E2SLp9jC3pK631LwxiO2lwGMgGnlQ0jAjVHFLnh/TuguIi+t8dpntL6pwaIhsXwe2lfg8/zkaejyaKulPGXwU0FkB3ivpQ6vzle6WCoH/uaXqT+2e/wuCXMUY10cRYAAAAABJRU5ErkJggg==
4849327e-c6fd-4c87-a781-bddf023eb32d	Travel	expense	2025-05-19 15:09:52.399	2025-05-19 15:09:52.399	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAopJREFUSEu1lUmozWEYxn+PDAtDhgwrEiVTpoxl3FCGlKsUkrpdC1fJkAWZu1tkyJSUoSxkuDdyy4IiWZglcS1MK7kWMix4fa/eo79z/pwjna9O595v+L3v+7zP9x1RxaEqsvlvuJn1A+YArcBFSR8LCefCzawbUA+8Ap4Aj7OHCofNbAWwD2gbc++AMZJe+v8lcDPrClxNWYwukuxNBHoEPAXaAXuCcRgYCMzwYJJWlcDNrA1wA5gAvIggg4GhCeTV5I01knaZ2eQEvw40S5qZB+8EeIZdgnILaJDUaGa9AA80BBgUfzdJ2htrDvb5rZK2/UmW7sBqwEtziXy47jsS8Iyk79n0oz9erQd2ycZJ+pwLzzSrM+ANWwf0jvnnwHRJr4uaehB4AEyV9OGvbinKrANwClgAfPNGS3LQz2Fmc92CySWNkuZlz+a5ZRHQI6R4Bgzzg3FooaRzRcEHAF5RiyR3zK/xG9zM6gAvsTioZ1wj6byZedOvAC7beOAr8Cms2VHSlxJZzGw20BQLl+LbM+kJLAvHOLA5rOpbCja8C4wERkm6lwd3vQ6lzPvEojvgZDik1cyy4PvACOAt0B84Biz2j6TTuQ01s/axaW1cHN/nb0VfYJNnCtxxx0ST/U2pBfwONMSd2FjWLWY2C9gOjAU2h8brgZWSDpjZROBmNHMDcDbJciHJMr8sPGzmmrtj/EHanR6onR5Q0pZYvwZMAU4ktyz1SyRpeEXwAFwGvArPchJwRJK7yj3u875eGP5UlJclc0lc14LPffq4pOWZ9dsh3dHU4LpUlf1L5u75lnDFe2CapIcZuLurJll2fxbs6xX9EpnZktC0XpL3oKJREbwiUs6mqsJ/AOHa3xh4PGGBAAAAAElFTkSuQmCC
f4c6de78-c7ca-4b22-b59f-0728f5b7a6c9	Finance Fees	expense	2025-05-19 15:10:14.287	2025-05-19 15:10:14.287	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAdZJREFUSEvV1c2rD3EYBfDPUyxEKZJ3KUI3kuQlezuxs0BRcmUlFkrxJwhlda2QxEYpCiUpZeFlIambhLyUl8WNSOIx35pbP9fvzm9Sv4VZzpw5z/meOc+Z0Mcr+shtXPLMnIXdWIeVWNAhZAQP8QBnI+JxN5F/kWfmRJzAICa0PNlV7IqIj534buTnsQ2JG7iOe3iDd5iGuRjApuoEmzEJT7AqIn6MDviDPDPLi5/wHcsj4lkv5Zk5FTexBlsi4sp45PPxqn54Coci4lvTgMzcg5O1+sGION2GvGA+41Zty9valumY02HLzI7hjeQlES/xHs+xvpcteI0Pxe9q+N6IGOqlfDgilmbmEmytozijY9CX+gNewx0cx/6SsLa2/F+ej6al+H0JOzG7wfevlWWXMaXEsK0tJRkL8bNapA0Nnt8uUc3Mc9jRlryILb1xAHcj4lc39Zm5rBJwtN7oAmn9QUf5SkmV9R+b8xX16TrntiLvi+elZks5/avnpRnPdF2icjMzy8aV1ruPgy08P4LtNeFARDxtIl+Ni1hUg9p4XjD7qq2+0NjntfrJVe0erlRvxNqGnA/XnX8sIl6MxfX8h2bmYszrMmAkIh41FVtP8hatOC7kN46ozRh6BbMnAAAAAElFTkSuQmCC
9f8cb61f-6c3c-4cd4-9ccc-84c4089a1b47	Other expenses	expense	2025-05-19 15:10:49.685	2025-05-19 15:10:49.685	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAASpJREFUSEvNlb8uBFEYxX+HaESxlVBRUVuleAOS1SwFUek2Gk/gDTQaleiWhGg8gkgkEloNCqU/EfVhZO9GNmMmO3dmY9o793fP/c653ycq/FQhm8HAbW8Cu8BUxG0+gENJ2wnjR7ntEeAdGAKuIuAzwCSwIOkywGvAK/AkqbBy2wfAFrAmqT1Q+KOk6ayy2E4EzQNjKf/tAEtAU9JJr/JMuO1R4AaYzfGlEHwFOAWegfuUA4KhqfBMQ21vAEfAvqRWLzzK0H8NzzO0CbSBa+AipebLQB1YlXTcb1rGgVtgovS0dFpFAl7/I+dBef9pyes5UWkpCk9e3menM+7lQTLWQ1kaks67w8L2GdCIAIetD8CcpLff8GFgsQT43feweOkOixKAqYhKZ+gXGRWzGB2sE8QAAAAASUVORK5CYII=
c919fdff-4a5e-4ac5-814d-b1bcf762ffa0	Allowance	income	2025-05-23 07:43:32.147	2025-05-23 07:46:30.112	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAp9JREFUSEu9lTmIVmcYhZ8T0MIlLhEbsZCAC6I2KYSokQkSBhtFTRSbFIpLTGMKtbQxTQJB0YBgRtFCBQUXhogBiaggBpdCXHFLl4AmRlyDx3uG78qd8R8cBf3gNv/97nnfs7zvL97h0TvE5v2C2x4IrADWACMAA7uBXZI6bU8BFgHfAIOAp8AvwPeS7jSV6Na57fHAb8Ao4DFwERgJjC4fHQFmAR8A/wKXgbHAMOB/YLWkTXWBl+C2+wHngInAdmC5pCe5aHsGsB/4CHgeVpJ+qEFsrwR+KkWnSvoj75rga0MNOCBpTk+jbc8GDgNfS9phezJwW1IYpIGlwNaK2UlJ03qCnwei5xhJt5rgticAx4B1kjoK8CFgsaQTDQbXgY/zSLrR1bnt/hXVR9FR0vAWwL8D30naWYBTKM8CSTG869jem9+Adkm/NmUJvSRlYK11+SBJOVUV3Wh7ErAPWAZsAC4kWXUB28eB6VXhzyQdb4LXL76SlA7qbuZX3qyvovd3ZdrQIsVF24NLslIgxZKoq0CCMTxeNMHbgU7gXmXcJ9GsUWAAMC6dSnpue17MrApdA44WBvHl05gqKcW6T6jtpCWp+SsXJcWgbsf2kNAGOoAvyt2bJYZngZmS/msFHiaJ05Ly0QxJVxoMMpEpGKkyvduAP0vKMiOfSwrzrvPKbrGd334uOoZBOrlkO91GnmfAnmo6FwI/VgbH5HQc4H+aNHtdXLY3V91n8mJkWzHqYIYI+LBMbLAC3FYPU5/ASwy3lCWWjmYCD8uU3gWmAhnzdHy/pzctZWlh4Ebg25KiL6v9ksWUBXc6S6w2763AC4OYnN1RnzNFigetQHs1tLfLttPxKqBPwH2SpVnM9lzgiKRo/9rzfv/mXtvOG1x4AQhp+Bgc7ax8AAAAAElFTkSuQmCC
a5b2ebf4-af5d-4850-b941-8d97937b1999	Savings	saving	2025-05-19 14:43:36.909	2025-05-23 12:18:10.042	data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAotJREFUSEu1lVuIT1EUxn8fYYRMkdSklKQo11JCKZc8jMHk8iKM8CAiJeWau6Q0nhQj8qIZTEgGSaKJB5EXKQ+kSPLgUjLU56xx/tOZ42j+o+Y87rP3b317fWutLXrwUw+y+S+47TpgFTAN6AvMk3QnL7TbcNubgJM50DZJx8uC2x4DbAQmA5OA/rmDP4C5wGxgL1Ae3PZW4CjQB3gDvC7wpVlSve09wD6gBaiR9DO7t1NabB8EdqbA7cAVSb/+ZbrtKuAhMBK4CRwD2iS1xpkOuO1IwRPgMzAFGAL0KwJLelBatz0qMTRgwzJ750i6m4VfBJYnqaiTdM72VOBxAfyMpHWxbnu+pBbb41KTxwLDgaWSLmXh31JQZaQihe8qgH8IuO0twIlIo6TDabCzIS5ESmpsh9seBHwJAxPVkb8uP9vTgQhwKlKQchqANcAySU0l+AAglJcNL4puuxDeC4iq+CppcJeycxtsh/EbgJXAxE7K0yt9BIYmNV4hKZqk7M92LXA5c6BWUnPW0GfABGC0pFdlk/94FsYfAG4D98NoSd+z8MYoIaBa0o30NtGlm4GBuWANkt5mar0JWAIsknS1tJ6F7wb2J41zRNKOFD4jmR8dDZMJcCxRFh0cqsOv92kTDZX0qQg+Lxmht4BHkmKUxsFZwD3gJRBNNh5YDNRLijKMPdVJR1+PMZCU5MzsDbPKK4AwNVJQJeldBn5N0kLbK4ALOXikoQZYL+l0ITxVET/XJsY2A8/TgRSPQh4eYyEmYYiLFEaPjJBU6vL2GPmpODpp3ReJ871zBp6XtNr2gghUUEmHkpHx16j46yWyHU1QmQM8lRTTMnIcec0Hb02KoC0ftNvPXHfq/zcYTv0YOEtfzAAAAABJRU5ErkJggg==
\.


--
-- TOC entry 3418 (class 0 OID 24633)
-- Dependencies: 222
-- Data for Name: savinggoals; Type: TABLE DATA; Schema: public; Owner: Moneyfy_owner
--

COPY public.savinggoals (goal_id, user_id, title, target_amount, current_amount, start_date, end_date, updated_at, created_at) FROM stdin;
4cd3abcf-c886-4f5b-b885-451d27d6272c	efb2f725-ca32-4dd8-b288-2fd07019d3f2	New Gaming Laptop	20000000	500000	2025-05-15	2026-03-01	2025-05-13 01:50:07.428307	2025-05-13 01:45:17.402216
a8e01d15-0ec0-4a10-85c7-0069e001d33a	efb2f725-ca32-4dd8-b288-2fd07019d3f2	Holiday Trip	15000000	0	2025-05-15	2025-12-31	\N	2025-05-18 15:14:32.072215
3d8220ed-bdc0-4893-b894-ff9287a0036f	97646a48-c8de-4a76-81b3-9b47524d2a9a	Main Savings Goal	200000	0	2025-05-23	2025-06-24	2025-05-23 05:24:06.521152	2025-05-23 04:07:56.546268
a3d6a64b-f0c8-4c2b-af29-274da29d5502	74b728fa-8768-4fc5-b745-27b370794d1a	Holiday Trip	1500000	0	2025-05-15	2025-06-23	2025-05-23 07:02:30.593927	2025-05-18 15:20:13.19198
\.


--
-- TOC entry 3420 (class 0 OID 24663)
-- Dependencies: 224
-- Data for Name: transaction_types; Type: TABLE DATA; Schema: public; Owner: Moneyfy_owner
--

COPY public.transaction_types (type) FROM stdin;
income
expense
saving
\.


--
-- TOC entry 3421 (class 0 OID 24671)
-- Dependencies: 225
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: Moneyfy_owner
--

COPY public.transactions (transaction_id, user_id, category_id, amount, date, note, transaction_type, goal_id, updated_at, created_at) FROM stdin;
d5adf59f-a30b-4202-b3dd-bb7bcd50bda6	efb2f725-ca32-4dd8-b288-2fd07019d3f2	2bff810e-d6ad-4020-9d13-594e3b327a43	25000	2025-05-14	Updated Burger King Price	expense	\N	2025-05-14 18:40:52.981	2025-05-14 18:21:44.062
aaebb8b4-0592-49be-9034-e12a2d8c32da	efb2f725-ca32-4dd8-b288-2fd07019d3f2	2bff810e-d6ad-4020-9d13-594e3b327a43	100000	2025-04-01		expense	\N	2025-05-18 17:29:21.112	2025-05-18 17:29:21.112
9a7ca8fe-83e7-4ffb-b6cc-cfbb3830e356	efb2f725-ca32-4dd8-b288-2fd07019d3f2	2bff810e-d6ad-4020-9d13-594e3b327a43	120000	2025-05-01		income	\N	2025-05-18 17:30:39.864	2025-05-18 17:30:39.864
3e1fd635-8d0c-448b-b972-846f8e4659e6	efb2f725-ca32-4dd8-b288-2fd07019d3f2	2bff810e-d6ad-4020-9d13-594e3b327a43	60000	2025-05-01		expense	\N	2025-05-15 00:25:21.598	2025-05-15 00:25:21.598
e294e399-5a7b-4411-8c53-0a553baf6c43	74b728fa-8768-4fc5-b745-27b370794d1a	2bff810e-d6ad-4020-9d13-594e3b327a43	10000	2025-04-01	Netflix Subscription	expense	\N	2025-05-18 17:38:19.915	2025-05-18 17:38:19.915
56ed95da-24a9-4f50-9d98-74208ca3a8d2	97646a48-c8de-4a76-81b3-9b47524d2a9a	ce619f09-47c8-4ccf-a037-72eb3a6f1bea	100000	2025-05-23	netflix	expense	\N	2025-05-23 11:54:00.172	2025-05-23 11:54:00.172
504777c9-0990-4bef-8cb8-f672d133bbcb	97646a48-c8de-4a76-81b3-9b47524d2a9a	9f26e634-b01a-4112-86be-6aad9a61de5c	50000	2025-05-22		income	\N	2025-05-23 11:55:42.836	2025-05-23 11:55:42.836
b12963e5-4fb2-4ca2-a202-89b6a04851fc	74b728fa-8768-4fc5-b745-27b370794d1a	147e4324-8b92-4cc5-8127-f8e403fbea73	15000	2025-04-01		income	\N	2025-05-18 21:10:38.61	2025-05-18 21:10:38.61
b08d4505-8b73-4499-ad6d-09484aa0533b	74b728fa-8768-4fc5-b745-27b370794d1a	2bff810e-d6ad-4020-9d13-594e3b327a43	33000	2025-05-20	Beli kopi di sekar	income	\N	2025-05-20 19:43:24.458	2025-05-20 18:27:21.213
941be2a7-9710-4299-87f9-1076ffe4bb0e	efb2f725-ca32-4dd8-b288-2fd07019d3f2	2bff810e-d6ad-4020-9d13-594e3b327a43	100000	2025-05-14		income	\N	2025-05-18 17:30:05.204	2025-05-18 17:30:05.204
c8b11f3a-7945-4d25-bd86-4b3a5b02785a	97646a48-c8de-4a76-81b3-9b47524d2a9a	2bff810e-d6ad-4020-9d13-594e3b327a43	100000	2025-05-20	Kopi Sekar mahal	expense	\N	2025-05-20 19:44:00.805	2025-05-20 19:44:00.805
b8dfb8cf-4e5f-4418-88e1-de5137d79332	74b728fa-8768-4fc5-b745-27b370794d1a	147e4324-8b92-4cc5-8127-f8e403fbea73	250000	2025-05-20	Im rich HAHAHAHAHH	income	\N	2025-05-20 21:00:47.68	2025-05-18 20:30:36.547
2277872e-3946-4e3f-881f-c2f603089c02	97646a48-c8de-4a76-81b3-9b47524d2a9a	2bff810e-d6ad-4020-9d13-594e3b327a43	10000	2025-05-23	cilok	expense	\N	2025-05-23 12:07:41.064	2025-05-23 12:07:41.064
350e4af4-6a72-4d9d-a8b4-5f721d6456ec	97646a48-c8de-4a76-81b3-9b47524d2a9a	c919fdff-4a5e-4ac5-814d-b1bcf762ffa0	50000	2025-05-07		income	\N	2025-05-23 12:08:37.013	2025-05-23 12:08:37.013
f935802d-ba0a-4077-becf-d8c61b1bd53b	74b728fa-8768-4fc5-b745-27b370794d1a	10cb741d-41a2-4a00-bed9-bd1e8522e2c4	100000	2025-05-20	Dapet angpao	income	\N	2025-05-20 18:29:31.811	2025-05-20 18:29:31.811
299fccd3-4a9f-4cb7-90f1-a151510442f6	74b728fa-8768-4fc5-b745-27b370794d1a	2bff810e-d6ad-4020-9d13-594e3b327a43	12000	2025-05-20	es teh manis	expense	\N	2025-05-20 18:35:21.848	2025-05-20 18:35:21.848
20c1ca37-9e3a-4a97-ade8-40d03e84cbd2	97646a48-c8de-4a76-81b3-9b47524d2a9a	4849327e-c6fd-4c87-a781-bddf023eb32d	1500000	2025-05-23		expense	\N	2025-05-23 12:36:20.44	2025-05-23 12:36:20.44
a27d6a09-34a0-42f3-a672-f8509d03d541	74b728fa-8768-4fc5-b745-27b370794d1a	10cb741d-41a2-4a00-bed9-bd1e8522e2c4	120000	2025-05-23		income	\N	2025-05-23 14:04:27.249	2025-05-23 14:04:27.249
e2583532-1d87-427a-b301-c4affc031472	97646a48-c8de-4a76-81b3-9b47524d2a9a	a5b2ebf4-af5d-4850-b941-8d97937b1999	50000	2025-05-23	buat rakit pc	saving	\N	2025-05-23 14:05:12.859	2025-05-23 14:05:12.859
91679d5d-cb0e-4875-903f-d18124682a1d	74b728fa-8768-4fc5-b745-27b370794d1a	10cb741d-41a2-4a00-bed9-bd1e8522e2c4	1200000	2025-04-23		income	\N	2025-05-23 14:05:40.416	2025-05-23 14:05:40.416
1fa2745f-76c2-4bd7-9be2-ca9600619cd3	74b728fa-8768-4fc5-b745-27b370794d1a	a5b2ebf4-af5d-4850-b941-8d97937b1999	500000	2025-05-23		saving	\N	2025-05-23 14:06:59.511	2025-05-23 14:06:59.511
\.


--
-- TOC entry 3415 (class 0 OID 24590)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: Moneyfy_owner
--

COPY public.users (user_id, name, email, password, updated_at, created_at, profile_img_url) FROM stdin;
efb2f725-ca32-4dd8-b288-2fd07019d3f2	John Doe	john.doe@example.com	$2b$10$xagbwjacSOQMuAWQOm4ySumm1PILJFsUcidfm/2.ajxUel7Ln37mi	\N	2025-05-11 18:05:56.167424	\N
74b728fa-8768-4fc5-b745-27b370794d1a	Ikhsan Kurniawan	ikhsan@gmail.com	$2b$10$CqCdwp0/c97EXBUKNTVhQ.1sr.JzTGoLgHLRODXw5GEuVb3wUQIc6	\N	2025-05-17 02:56:09.011688	https://res.cloudinary.com/dbuhl9hbz/image/upload/v1747755549/julpnogbygfwwicdbhnt.jpg
97646a48-c8de-4a76-81b3-9b47524d2a9a	Wiellona	wiellona@example.com	$2b$10$VaLeGE6ZgFCK5PVW0jCn9OQQxvjzyFFE7QL3O/HAylySndMARTa6a	\N	2025-05-19 12:58:40.428992	https://res.cloudinary.com/dbuhl9hbz/image/upload/v1747963615/nv0txxqnukxye05atiaf.png
\.


--
-- TOC entry 3243 (class 2606 OID 24589)
-- Name: account_types account_types_pkey; Type: CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.account_types
    ADD CONSTRAINT account_types_pkey PRIMARY KEY (type);


--
-- TOC entry 3249 (class 2606 OID 24608)
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (account_id);


--
-- TOC entry 3255 (class 2606 OID 24652)
-- Name: budgets budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (budget_id);


--
-- TOC entry 3251 (class 2606 OID 24627)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 3253 (class 2606 OID 24641)
-- Name: savinggoals savinggoals_pkey; Type: CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.savinggoals
    ADD CONSTRAINT savinggoals_pkey PRIMARY KEY (goal_id);


--
-- TOC entry 3257 (class 2606 OID 24670)
-- Name: transaction_types transaction_types_pkey; Type: CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.transaction_types
    ADD CONSTRAINT transaction_types_pkey PRIMARY KEY (type);


--
-- TOC entry 3259 (class 2606 OID 24678)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id);


--
-- TOC entry 3245 (class 2606 OID 24599)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3247 (class 2606 OID 24597)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3260 (class 2606 OID 24614)
-- Name: accounts accounts_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_type_fkey FOREIGN KEY (type) REFERENCES public.account_types(type);


--
-- TOC entry 3261 (class 2606 OID 24609)
-- Name: accounts accounts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3263 (class 2606 OID 24658)
-- Name: budgets budgets_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- TOC entry 3264 (class 2606 OID 24653)
-- Name: budgets budgets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3262 (class 2606 OID 24642)
-- Name: savinggoals savinggoals_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.savinggoals
    ADD CONSTRAINT savinggoals_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3265 (class 2606 OID 24684)
-- Name: transactions transactions_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- TOC entry 3266 (class 2606 OID 24694)
-- Name: transactions transactions_goal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.savinggoals(goal_id) ON DELETE SET NULL;


--
-- TOC entry 3267 (class 2606 OID 24689)
-- Name: transactions transactions_transaction_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_transaction_type_fkey FOREIGN KEY (transaction_type) REFERENCES public.transaction_types(type);


--
-- TOC entry 3268 (class 2606 OID 24679)
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Moneyfy_owner
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- TOC entry 2083 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2082 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2025-05-23 14:08:24

--
-- PostgreSQL database dump complete
--

