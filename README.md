# Requirements Specification

| Space       | Meaning                     |
|-------------|-----------------------------|
| version     | 1.0                         |
| date of publish     | 2026-10-19          |
| project_name | YuksalUp                   |

---

## 1. Project description
A web platform where school students can find internships/volunteering opportunities/debates/olympiads and study cases.

### 2. Development priorities

- In this project every feature is mandatory and required to be developed fully. 

### 3. Roles

| ID     | Roles   | Description                                                                        |
|--------|---------|------------------------------------------------------------------------------------|
| ROLE-1 | User    | ordinary user                                                                      |
| ROLE-4 | Admin   | availability to update/add/remove/ posters, manage accounts and control the system |


### 4.1 Authentication (AUTH)

| ID      | Requirements                                                                                    | Role        | 
|---------|-------------------------------------------------------------------------------------------------|-------------|
| YU-AUTH-01 | Registration with following fields: first name, last name, email, password                   | User      |
| YU-AUTH-02 | Verification through a link sent to provided email by user                                   | User      | 
| YU-AUTH-03 | Log in through email and password                                                            | User      | 
| YU-AUTH-04 | Access token every 15 minutes and refresh token every 3 days                                 | User      | 
| YU-AUTH-05 | Password recovery through email (verified by link)                                           | User      | 

### 4.2 Poster and applications

| ID         | Requirements                                                                                 | Role    | 
|------------|----------------------------------------------------------------------------------------------|---------|
| YU-POST-01 | Viewing catalog of posters on the bord                                                       | User  | 
| YU-POST-02 | Poster page: name, dates, description, important application information                     | User  | 
| YU-POST-03 | Full-text search by title and description of poster                                          | User  | 
| YU-POST-04 | Filtration based on several key words selected by user                                       | User  | 
| YU-POST-05 | Availability of saving programs into favorites page                                          | User  | 
| YU-POST-06 | Calendar of events and programs                                                              | User  | 
| YU-POST-07 | Selection of programs and directions of interest after successful email verification         | User  | 
| YU-POST-08 | Profile: view personal data and settings                                                     | User  | 


### 4.3 Admin panel

| ID        | Requirements                                       | Role  | 
|-----------|----------------------------------------------------|-------|
| YU-ADM-01 | Manage users and their accounts                    | Admin | 
| YU-ADM-02 | Dashboard: Registered Users and account details    | Admin | 
| YU-ADM-03 | Create, edit, and delete posters in the admin panel| Admin | 

---

## 5. Non-functional requirements

| ID      | Category        | Requirements                                                       | 
|---------|-----------------|--------------------------------------------------------------------|
| NFR-03  | Security        | Пароли хэшируются bcrypt, хранятся только хэши                     | 
| NFR-04  | Security        | Все запросы только по HTTPS                                        | 
| NFR-05  | Security        | Rate limiting: не более 10 запросов/мин на эндпоинты auth с одного IP | 
| NFR-07  | Reliability     | Ежедневный бэкап БД, хранение 14 дней                              | 
| NFR-08  | Observability   | Структурированные логи и мониторинг ошибок                         | 
| NFR-09  | Localization    | Интерфейс на русском, английском и узбекском языках                | 
| NFR-10  | Compliance      | Согласие на обработку персональных данных при регистрации          | 

---

## 6. Business rules

| ID    | Rule                                                                    | Connected with   |
|-------|-------------------------------------------------------------------------|------------------|
| BR-01 | It is possible to apply for the program on a third-party page, only     |                  |
| BR-02 | User is obliged to fill form regarding his personal information         |                  |
| BR-03 | After an unsuccessful search for programs, other directions appear in the suggestion | YU-POST-04 |

--- 

## 7. Stacks

| ID    | Development                                              |
|-------|----------------------------------------------------------|
| CON-01 | Backend: Python - FastAPI, БД: PostgreSQL               |
| CON-03 | DEV deadline:                                           |
| CON-04 | Hosting and domain                                      |

---

## 8. История изменений

| Версия | Дата       | Изменение                         | Автор |
|--------|------------|-----------------------------------|-------|
| 1.0    | 2026-10-19 | Первая версия по итогам интервью  | Jersey|
