# IP Address Management Solution
IP Address Management Solution is an application where you can manage a list of ip address and see the logs of every addition and changes.

## Information

This application is developed on Windows 11 by creating necessary environment using `Docker`. So you need the Docker to be installed and running in your machine.

## Features

* Authentication
* IP Address Crud Operation
* Audit Logs


## Getting started

1. Clone the `ip-address-management` github repository

    ```bash
    git clone https://github.com/sbashar04/ip-address-management
    ```

2. Go to `ip-address-management` directory

    ```bash
    cd ip-address-management
    ```

3. Copy project environment file from `.env.example` to `.env`

    ```bash
    cp .env.example .env
    ```

4. Run `docker-compose`

    ```bash
    docker-compose up -d
    ```

5. Go to <http://localhost:9999> on browser and login using

    ```bash
    System: MySQL
    Server: ipam_mysql8
    Username: root
    Password: 123456
    ```

6. Confirm that a database named `ip_address_management` is created.

7. Copy laravel environment file from `app/server/.env.example` to `app/server/.env`. Necessary changes is already there for local test environment.

    ```bash
    cp app/server/.env.example app/server/.env
    ```

8. To run migrations in laravel project, enter into the docker PHP image by running the command bellow.

    ```bash
    docker exec -it ipam_php bash
    ```

9. Inside docker PHP image, Run `composer install` command

    ```bash
    composer install
    ````

10. Inside docker PHP image, Run `php artisan key:generate` command to generate laravel application key

    ```bash
    php artisan key:generate
    ````

11. Inside docker PHP image, run `php artisan migrate`

    ```bash
    php artisan migrate
    ```

12. Inside docker PHP image, run `php artisan passport:install` for creating passport auth private and public keys

    ```bash
    php artisan passport:install
    ```

13. Create an user by running

    ```bash
    php artisan db:seed --class=UserSeeder
    ```

14. Go to <http://ipam.test> on browser and login to IP Address Management

    ```bash
    Username: admin@ipam.test
    Password: admin1234
    ```

15. To create some dummy data, run `php artisan db:seed`

    ```bash
    php artisan db:seed
    ```

16. To make modifications in the frontend application, access to the angular docker image by running

    ```bash
    docker exec -it ipam_angular //bin//sh
    ```

17. To run angular local server

    ```bash
    npm start
    ```
18. Go to <http://localhost:4200> on browser to see the changes.

## Contact

    Email: me@shafiulbashar.com OR dshafiul@gmail.com

## Contribution

You are invited to contribute. All PRs will be reviewed.

## License

MIT
