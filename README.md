# MenuMate - Online Menu & Ordering Platform

![Project Screenshot](https://i.imgur.com/FLX8wfw.png)

## Description

MenuMate is a full-stack web application that allows users to browse a restaurant's digital menu, create an account, and place pickup or delivery orders. Authenticated users can manage their own orders, while administrators can securely manage menu items and categories through a protected admin interface.

This project was built as an individual capstone project to demonstrate full-stack development skills, including authentication, authorization, RESTful APIs, database design, and responsive UI/UX.

## Background

Many restaurants rely on static or outdated menus. MenuMate was created to provide a modern, flexible, and secure digital menu system that can grow to support features such as online ordering, reservations, and delivery management.

This project emphasizes role-based access, ensuring that only authorized users can create, update, or delete data.

## User Roles & Authentication

### Guest Users
- View menu and categories
- Browse menu items by category
- See item details and prices

### Authenticated Users
- Create an account and log in
- Place pickup or delivery orders
- Add items to cart with quantity selection
- View their own order history
- Track order status (pending, preparing, ready, completed, cancelled)
- Add special instructions to orders
- Log out securely

### Admin Users
- Create, update, and delete menu items
- Manage menu categories
- Mark items as available or unavailable
- View and manage all orders from all users
- Update order status in real-time

**Authentication** is handled using JWT token-based authentication through Supabase Auth, and **authorization** is enforced on both the front-end and back-end using Row Level Security (RLS) policies.
