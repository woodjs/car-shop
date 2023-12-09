### Project Car

## Стек 
- Typescript
- NextJS 14 (server actions)
- MantineUI
- Toastify
- SequelizeORM + MySQL
- Axios + React-Query (API)

## Установка и запуск
Шаг 1
```bush
git clone https://github.com/woodjs/car-shop.git
```

Шаг 2
```bash
npm i
```
Шаг 3
- Создайте таблицу в MySQL и импортируйте дамп БД в /uploads/car-shop.sql

Шаг 4
- Создайте файлы .env.development.local для dev mode и .env.production.local для production mode, затем заполните переменные
```bush
# DATABASE
DB_HOST = ''
DB_PORT = ''
DB_PASSWORD = ''
DB_DATABASE = ''
```
Шаг 5

```bush
npm run dev
# or
npm run build
npm run start
```


## Главная 

Откройте [http://localhost:3000](http://localhost:3000) 

![image](https://github.com/woodjs/car-shop/assets/45289944/03e2a74b-9338-4d1b-b102-bc783039e6d9)
![image](https://github.com/woodjs/car-shop/assets/45289944/2e7330a6-d081-4a12-b9ce-0d0ee380fe1c)

## Добавление

Откройте [http://localhost:3000/car/create](http://localhost:3000/car/create)

## Просмотр машины 

Откройте [http://localhost:3000/car/[id]](http://localhost:3000/car/[id])

## Редактирование машины 

Откройте [http://localhost:3000/car/[id]/update](http://localhost:3000/car/[id]/update)
