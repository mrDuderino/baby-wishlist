# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# Baby Wishlist

Version: 1.0

---

# Project Vision

Develop a premium web application for a baby wishlist.

The website is intended for friends and family who would like to give a gift before the birth of our daughter.

This is NOT an e-commerce website.

It should feel like a warm, personal landing page with premium UX and a beautiful emotional design.

The application should be simple enough for grandparents while looking like a product built by Apple or Airbnb.

The project must be production-ready and easily extensible for future features.

---

# AI Working Agreement

You are acting as a Senior Staff Full Stack Engineer.

You are responsible for the architecture, UX, frontend, backend, database, DevOps and developer experience.

Your objective is to build a production-ready application.

Do NOT generate the entire project in one response.

Instead, work iteratively.

Complete one stage.

Verify it.

Stop.

Wait for confirmation before continuing.

Never skip stages.

Never leave partially implemented functionality.

Every completed stage must:

• compile successfully

• pass TypeScript

• pass ESLint

• pass all tests

• include documentation updates

• be production-ready

If you need to make an architectural decision,
briefly explain your reasoning before implementing it.

Always optimize for maintainability.

Write code another senior engineer would happily maintain.

---

# Working Rules

Always think before coding.

Before implementing any feature:

1. Analyze requirements.

2. Identify edge cases.

3. Consider security.

4. Consider performance.

5. Explain the implementation plan briefly.

6. Then implement.

Never overengineer.

Never introduce abstractions before they are needed.

Prefer boring, maintainable code.

Prefer readability over cleverness.

Prefer explicitness over magic.

Always optimize for long-term maintenance.

---

# Primary Goals

Create a beautiful landing page.

Allow guests to browse gifts.

Allow guests to reserve gifts without registration.

Notify parents automatically about new reservations.

Provide an admin panel for managing the wishlist.

Support realtime updates across all connected users.

Deploy easily on Vercel.

Use Supabase as the backend.

---

# Non Goals

No payment processing.

No checkout.

No shopping cart.

No user registration for guests.

No marketplace integration.

No Google Sheets synchronization.

No CMS.

---

# Target Audience

Friends

Family

Colleagues

Anyone invited through the wishlist link.

Users should not need any technical knowledge.

Everything should be obvious.

---

# Tech Stack

Framework

Next.js 15 (App Router)

TypeScript

React Server Components by default

---

Styling

TailwindCSS

shadcn/ui

Framer Motion

Lucide Icons

clsx

tailwind-merge

---

Backend

Supabase

Supabase PostgreSQL

Supabase Auth

Supabase Realtime

Supabase Storage

Row Level Security enabled

---

Deployment

Vercel

Vercel Analytics

Vercel Speed Insights

---

Fonts

Inter

Cormorant Garamond

Loaded through next/font.

---

Package Manager

pnpm

---

Node Version

Latest LTS

---

# Design Philosophy

The website should look like a premium editorial website.

Reference inspiration:

Apple

Airbnb

Notion

Linear

Stripe

Minimalism

Scandinavian interiors

Pinterest baby photography

Warm natural light

Editorial typography

Lots of whitespace

Subtle animations

No visual clutter.

The interface should feel calm.

---

# Color Palette

Background

#FAF8F5

Cards

#FFFFFF

Primary Accent

#B79E8B

Secondary Accent

#A9B7A2

Text

#3A3A3A

Muted Text

#7A7A7A

Borders

#ECE8E4

Success

#6B9F71

Warning

#F0C674

Danger

#D96A6A

---

# Typography

Headings

Cormorant Garamond

Large

Elegant

Wide spacing

Body

Inter

16-18px

Comfortable line height

Buttons

Inter Medium

---

# Border Radius

Cards

24px

Buttons

18px

Inputs

16px

Images

24px

---

# Shadows

Soft only.

Never use heavy shadows.

---

# Layout

Maximum width

1200px

Desktop

Three-column product grid

Tablet

Two-column grid

Mobile

Single-column layout

Spacing should be generous.

---

# Motion

Use Framer Motion.

Animations must never feel distracting.

Use:

Fade

Slide

Scale

Stagger

Parallax

Hover lift

Hero slow zoom

Button scale

Animated counters

Scroll reveal

---

# Accessibility

Keyboard navigation

ARIA labels

Focus rings

Color contrast AA

Screen reader friendly

---

# Performance

Target Lighthouse scores

Performance

95+

Accessibility

100

Best Practices

100

SEO

100

CLS

<0.1

LCP

<2 seconds

---

# SEO

Dynamic metadata

OpenGraph

Twitter cards

JSON-LD

robots.txt

sitemap.xml

Canonical URLs

Optimized images

Lazy loading

Responsive images

# Public Website

The public website is the main experience for guests.

The tone should be warm, welcoming and emotional.

It should never feel like an online shop.

The interface should guide the visitor naturally from the introduction to choosing a gift.

---

# Navigation

Minimal top navigation.

Logo on the left.

Menu on the right.

Items

Home

Wishlist

About

FAQ

Navigation becomes transparent over the hero and solid after scrolling.

Sticky navigation.

Smooth scrolling.

---

# Hero Section

Height

100vh

Background

Large warm lifestyle photograph of a cozy baby room.

Use Next/Image.

Dark overlay around 20%.

Center aligned.

Headline

Совсем скоро в нашей семье появится маленькое чудо 🤍

Subheadline

Мы подготовили небольшой вишлист, чтобы друзьям и близким было проще выбрать подарок нашей малышке.

Primary Button

Посмотреть вишлист

Secondary Button

Узнать больше

Below buttons

Small muted text

Спасибо, что разделяете этот важный момент вместе с нами ❤️

Subtle animated scroll indicator.

---

# About Section

Title

Немного о нас

Body

До встречи с нашей дочкой осталось совсем немного.

Мы уже готовим её комнату, выбираем первую коляску и постепенно собираем всё необходимое.

Этот список создан только для того, чтобы избежать одинаковых подарков и помочь тем, кто спрашивал, что действительно пригодится.

Спасибо, что вы разделяете этот момент вместе с нами ❤️

Include a warm lifestyle photo.

Two-column layout on desktop.

Single column on mobile.

---

# Statistics Section

Display beautiful animated statistics.

Examples

17 подарков уже нашли своих дарителей

42 подарка всего

25 ещё доступны

Countdown

До встречи осталось

XX дней

Animated progress bar.

Numbers animate on first appearance.

---

# Wishlist Section

The wishlist is the core feature.

Products should be displayed as premium cards.

Cards must never feel like marketplace listings.

Cards should be spacious.

Elegant.

Minimal.

---

Card Layout

Large image

Category badge

Product name

Short description

Price

Status badge

Primary action

Optional marketplace icon

---

Status

Available

Reserved

Purchased

Hidden

Status colors

Available

Primary

Reserved

Warning

Purchased

Success

Hidden

Muted

---

Hover

Card slightly lifts.

Image slowly zooms.

Shadow becomes slightly stronger.

Button animates.

---

Product Modal

Clicking a product opens a modal.

The modal should include:

Large gallery

Product title

Category

Description

Reason why we selected this product

Price

Marketplace links

Reserve button

Close button

Gallery supports swipe on mobile.

Keyboard navigation on desktop.

ESC closes modal.

---

Wishlist Categories

🚗 Прогулки

🛏 Сон

🍼 Кормление

🛁 Гигиена

👕

Одежда

🎀 Разное

Each category starts with

Large heading

Small description

Decorative illustration

Products inside responsive grid.

---

Example Products

Прогулки

Anex Mev 2 в 1

Cybex Cloud T i-Size

Cybex Sirona T

Cybex Base T

---

Сон

Приставная кроватка

Матрас

Наматрасник

Простыни

Манеж

Игровой коврик

Пеленальный матрасик

---

Кормление

Бутылочки

Подогреватель Miniland

Муслиновые салфетки

Крем для мамы

Прокладки для груди

---

Гигиена

Детская ванночка

Подгузники

Одноразовые пеленки

Влажные салфетки

Детские ножницы

---

# FAQ Section

Questions

Почему некоторые подарки недоступны?

Потому что их уже забронировали.

Можно подарить что-то другое?

Конечно ❤️

Можно объединиться для дорогого подарка?

Да.

Свяжитесь с нами.

Нужно ли покупать именно по указанной ссылке?

Нет.

Можно приобрести в любом магазине.

Accordion component.

Smooth open animation.

---

# Footer

Minimal.

Warm.

Large whitespace.

Text

Самый ценный подарок — это люди, которые будут рядом с нашей дочкой с первых дней жизни.

Спасибо, что вы с нами ❤️

Small footer

Made with ❤️

Copyright

Current year

Optional links

Telegram

Telemost

# Reservation System

The reservation system is the core business feature.

Guests must be able to reserve gifts without creating an account.

The entire flow should take less than 30 seconds.

The process should feel effortless.

No login.

No email verification.

No passwords.

No unnecessary steps.

---

# Reservation Flow

Guest clicks

Подарить

↓

Reservation modal opens.

---

# Reservation Modal

Title

🎁 Отличный выбор!

Subtitle

Заполните пару полей, и подарок будет автоматически забронирован за вами.

Fields

Name *

Telegram

Phone

Comment

Validation rules

Name is required.

Guest must provide either:

Telegram

or

Phone

At least one contact method is required.

Comment is optional.

Maximum comment length

500 characters.

Buttons

Primary

Забронировать подарок

Secondary

Отмена

---

# Successful Reservation

After successful reservation show success screen.

Title

❤️ Спасибо!

Body

Подарок успешно забронирован.

Мы получили уведомление.

Если потребуется что-то уточнить —
мы обязательно свяжемся с вами.

Buttons

Вернуться к списку

---

# Reservation States

Every reservation has one of the following statuses.

pending

confirmed

cancelled

purchased

---

State Diagram

available

↓

pending

↓

confirmed

↓

purchased

OR

available

↓

pending

↓

cancelled

↓

available

---

# Product States

Every product has one status.

available

reserved

purchased

hidden

Rules

available

Visible

Can be reserved.

reserved

Visible

Cannot be reserved.

Purchased

Visible.

Shows

Спасибо ❤️

Hidden

Visible only in admin panel.

---

# Reservation Lifecycle

User submits reservation.

↓

Reservation created.

↓

Product becomes reserved.

↓

Realtime event published.

↓

Telegram notification sent.

↓

Admin reviews reservation.

↓

Confirm

or

Cancel.

---

# Automatic Expiration

Pending reservations should expire automatically.

Expiration time

72 hours

Every hour a scheduled job runs.

Pseudo flow

Find reservations

WHERE

status = pending

AND

expires_at < now()

↓

Cancel reservation

↓

Set product

available

↓

Publish realtime update

↓

Notify admin (optional)

---

# Duplicate Reservation Protection

Only one active reservation per product.

If two users try to reserve simultaneously:

First transaction succeeds.

Second transaction receives:

"К сожалению, этот подарок только что был забронирован."

Reservation must be protected by database transaction.

Never rely only on frontend validation.

---

# Optimistic UI

Immediately disable reserve button after click.

Show loading state.

Prevent double submission.

If request fails

restore previous state.

---

# Supabase Realtime

Realtime must update

Product cards

Statistics

Reservation count

Progress bar

Status badges

Admin dashboard

Without page refresh.

---

Realtime Channels

products

reservations

settings

---

Events

INSERT reservation

UPDATE reservation

DELETE reservation

UPDATE product

UPDATE settings

---

Realtime Examples

Guest reserves gift

↓

Everyone sees

✓ Уже забронировано

Admin confirms reservation

↓

Status updates instantly

Reservation cancelled

↓

Gift becomes available

No reload.

---

# Telegram Bot Integration

Create Telegram Bot.

Store bot token securely.

Use server-side API only.

Never expose token.

---

Telegram Notification

When reservation created.

Example

🎁 Новая бронь

👤 Иван

📦 Cybex Cloud T

📱 @ivan

☎ +7...

💬 Подарим на выписку ❤️

Дата:
17.07.2026 18:43

Open Admin →
(link)

---

When reservation cancelled

❌ Бронь отменена

Product

Guest

Reason

---

When reservation confirmed

✅ Бронь подтверждена

Product

Guest

---

# Telegram Deep Links

Messages should contain direct links to

Reservation

Product

Admin panel

One click access.

---

# Rate Limiting

Public reservation endpoint

Maximum

5 reservations

per IP

per hour.

Return HTTP 429.

---

# Spam Protection

Cloudflare Turnstile

Server validation

Input sanitization

Duplicate submission protection

Maximum payload size

Comment length limit

Reject malformed requests.

---

# Audit Log

Every important action should be logged.

Reservation created

Reservation confirmed

Reservation cancelled

Reservation deleted

Product updated

Admin login

Settings changed

Each record contains

Timestamp

User

Action

Object

Previous value

New value

IP address

User Agent

---

# Notifications Architecture

Reservation Created

↓

Create Reservation

↓

Update Product

↓

Publish Realtime Event

↓

Send Telegram Message

↓

Write Audit Log

↓

Return Success

Each step should be isolated.

Failures in Telegram must never rollback reservation creation.

Telegram notifications should be asynchronous.

---

# Error Handling

Friendly messages only.

Examples

Не удалось выполнить бронирование.

Попробуйте ещё раз.

---

Этот подарок уже успели забронировать.

---

Что-то пошло не так.

Попробуйте немного позже.

Never expose stack traces.

Never expose SQL errors.

Never expose Supabase internals.

# Admin Panel

The application must include a secure administration panel.

Only authenticated administrators can access it.

No public registration.

Admin accounts are created manually through Supabase Auth.

Authentication should use secure HTTP-only cookies.

The admin panel should feel like a modern SaaS dashboard.

Reference inspiration

Linear

Vercel

Supabase

Stripe Dashboard

---

# Admin Navigation

Sidebar

Dashboard

Products

Reservations

Categories

Media Library

Site Settings

Audit Log

Profile

Logout

Desktop

Collapsible sidebar

Mobile

Slide-over navigation

---

# Dashboard

Display key statistics.

Cards

Total Products

Available

Reserved

Purchased

Pending Reservations

Countdown

Total Views (future)

Latest Reservations

Reservation timeline

Recent activity

Quick actions

Add Product

Upload Image

Open Website

---

# Products Management

Admin can

Create product

Edit product

Delete product

Archive product

Duplicate product

Reorder products

Move between categories

Hide product

Restore product

---

# Product Form

Fields

Title

Slug

Category

Description

Short description

Price

Currency

Priority

Status

Marketplace links

Gallery

Sort order

Visible

Featured

Reason why selected

SEO title

SEO description

---

Gallery

Drag and drop upload

Multiple images

Reorder images

Delete images

Cover image

Images stored in

Supabase Storage

---

Marketplace Links

Support multiple links.

Examples

Ozon

Wildberries

Amazon

Official Store

Other

Each link has

Title

URL

Icon

Optional badge

---

# Reservation Management

Table

Reservation

Guest

Contact

Product

Status

Created

Expires

Actions

Filters

Pending

Confirmed

Purchased

Cancelled

Search

Guest name

Telegram

Phone

Product

Date range

---

Reservation Details

Guest information

Reservation date

Expiration

Comment

Timeline

IP Address (optional)

Browser (optional)

Buttons

Confirm

Cancel

Mark Purchased

Delete

---

# Categories

CRUD

Fields

Name

Emoji

Description

Sort order

Visibility

---

# Site Settings

Editable content

Hero title

Hero subtitle

About text

Footer text

Countdown date

Telegram URL

WhatsApp URL

Social links

SEO defaults

OpenGraph image

Favicon

Analytics IDs

Maintenance mode

---

# Media Library

Upload images

Delete images

Replace images

Preview

Search

Folders (future)

Images stored in Supabase Storage.

Automatically optimize images.

Generate thumbnails.

---

# Audit Log

Every admin action should be recorded.

Fields

Timestamp

Admin

Action

Entity

Entity ID

Previous value

New value

IP

User Agent

Searchable

Filterable

Exportable

---

# Profile

Display

Admin name

Email

Avatar

Last login

Password change

Logout

---

# Database

Database

Supabase PostgreSQL

Enable

Row Level Security

Use UUID everywhere.

created_at

updated_at

timestamps for every table.

---

# Tables

categories

id UUID

name TEXT

emoji TEXT

description TEXT

sort_order INTEGER

visible BOOLEAN

created_at TIMESTAMP

updated_at TIMESTAMP

---

products

id UUID

category_id UUID

title TEXT

slug TEXT UNIQUE

short_description TEXT

description TEXT

reason_selected TEXT

price NUMERIC

currency TEXT

status TEXT

priority INTEGER

featured BOOLEAN

visible BOOLEAN

cover_image TEXT

gallery JSONB

marketplace_links JSONB

reservation_id UUID NULL

sort_order INTEGER

seo_title TEXT

seo_description TEXT

created_at TIMESTAMP

updated_at TIMESTAMP

---

reservations

id UUID

product_id UUID

guest_name TEXT

telegram TEXT

phone TEXT

comment TEXT

status TEXT

expires_at TIMESTAMP

confirmed_at TIMESTAMP

cancelled_at TIMESTAMP

purchased_at TIMESTAMP

created_at TIMESTAMP

updated_at TIMESTAMP

ip_address TEXT NULL

user_agent TEXT NULL

---

settings

key TEXT PRIMARY KEY

value JSONB

updated_at TIMESTAMP

---

audit_logs

id UUID

admin_id UUID

action TEXT

entity TEXT

entity_id UUID

old_value JSONB

new_value JSONB

ip_address TEXT

user_agent TEXT

created_at TIMESTAMP

---

profiles

id UUID

email TEXT

name TEXT

avatar_url TEXT

created_at TIMESTAMP

---

# Row Level Security

Enable RLS on every table.

Public users

Can read

categories

products

public settings

Cannot insert.

Cannot update.

Cannot delete.

Guests

Can insert reservations only.

Cannot modify reservations.

Admins

Full CRUD.

Use Supabase policies.

Never rely only on frontend permissions.

---

# Storage

Bucket

wishlist

Public read

Authenticated write

Automatic image optimization

Accepted formats

jpg

jpeg

png

webp

avif

Maximum size

10 MB

---

# API

Use Next.js Route Handlers.

Server Actions where appropriate.

Endpoints

GET /api/products

GET /api/categories

POST /api/reservations

PATCH /api/reservations/:id

PATCH /api/products/:id

POST /api/upload

GET /api/settings

---

# Validation

Use Zod.

Validate

Every request

Every environment variable

Every form

Every API response

Never trust client data.

---

# Security

Environment variables only.

No secrets in frontend.

Escape all user input.

Prevent XSS.

Prevent SQL Injection.

Validate URLs.

Rate limit public endpoints.

Enable CSP headers.

Enable security headers.

Use HTTPS only.

Use secure cookies.

Protect admin routes with middleware.

Never expose database IDs unnecessarily.

---

# Error Logging

Capture unexpected server errors.

Log internally.

Show friendly messages to users.

No stack traces in production.

Support future integration with Sentry.

# Project Architecture

Use a clean, scalable architecture.

Preferred architecture

Feature-Sliced Design (FSD)

or

A well-organized modular architecture with clear boundaries.

Avoid large monolithic components.

Business logic must never live inside UI components.

Separate

UI

Business logic

Data layer

API layer

Utilities

Types

Configuration

---

# Folder Structure

app/

(public routes)

(admin routes)

(api)

components/

shared/

ui/

widgets/

features/

entities/

lib/

hooks/

types/

styles/

public/

supabase/

middleware.ts

Each folder should have a single responsibility.

Avoid circular dependencies.

---

# Components

Components should be:

Small

Reusable

Typed

Accessible

Composable

Avoid prop drilling.

Use composition over inheritance.

Avoid deeply nested JSX.

---

# State Management

Prefer Server Components.

Use Client Components only where interaction is required.

Local UI state

React State

Server state

Supabase

Avoid unnecessary global state.

If global state becomes necessary

use Zustand.

Do not introduce Redux.

---

# Data Fetching

Server Components should fetch data whenever possible.

Use cache appropriately.

Use revalidation where applicable.

Avoid waterfall requests.

Use loading.tsx

error.tsx

not-found.tsx

for App Router.

---

# Forms

Use

React Hook Form

-

Zod

Validation

Client validation

Server validation

Shared schemas

Show inline validation errors.

Disable submit while pending.

Prevent duplicate submission.

---

# Loading States

Every async interaction should have a loading state.

Examples

Skeleton cards

Loading buttons

Page skeleton

Image placeholders

Dashboard loading

Reservation modal loading

Never leave blank screens.

---

# Empty States

Wishlist empty

No reservations

No products

No search results

Media library empty

Each empty state should include

Illustration

Friendly message

Primary action

---

# Error States

Graceful error UI.

Examples

Network unavailable

Server error

Reservation failed

Image upload failed

Permission denied

Each should include

Explanation

Retry button

---

# Image Handling

Use Next/Image everywhere.

Responsive sizes.

Blur placeholder.

Lazy loading.

Priority only for Hero image.

Optimize automatically.

---

# Icons

Use Lucide Icons exclusively.

Consistent sizing.

No mixed icon libraries.

---

# Internationalization

Architecture should support i18n.

Initial language

Russian

Future support

English

All user-facing strings should be centralized.

Avoid hardcoded strings inside components.

---

# Environment Variables

NEXT_PUBLIC_SITE_URL

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

SUPABASE_JWT_SECRET

TELEGRAM_BOT_TOKEN

TELEGRAM_CHAT_ID

NEXT_PUBLIC_TELEGRAM_URL

NEXT_PUBLIC_WHATSAPP_URL

VERCEL_ANALYTICS_ID

All variables must be validated during application startup.

Fail fast if required variables are missing.

---

# Deployment

Target platform

Vercel

Requirements

One-click deployment

Environment variables documented

Automatic preview deployments

Production deployment

Automatic image optimization

Serverless compatible

Edge compatible where appropriate

Supabase Edge Functions
for background jobs and Telegram notifications.

---

# CI/CD

GitHub repository.

GitHub Actions.

Pipeline

Install

Lint

Typecheck

Unit tests

Build

Deploy

Reject pull requests with

Type errors

Lint errors

Failed tests

---

# Code Quality

Strict TypeScript

ESLint

Prettier

Husky

Lint-staged

Conventional commits

Meaningful naming

No any

No duplicated code

No dead code

Reusable abstractions

Readable code over clever code

---

# Testing

Unit tests

Vitest

React Testing Library

Cover

Utility functions

Validation

Reservation logic

Business rules

Integration tests

API routes

Reservation flow

Authentication

Future support for Playwright E2E.

---

# Monitoring

Support future integration with

Sentry

PostHog

Plausible

Do not tightly couple monitoring to application logic.

---

# Analytics

Integrate

Vercel Analytics

Vercel Speed Insights

Track future events

Reservation Created

Reservation Confirmed

Reservation Cancelled

Admin Login

Product Viewed

Wishlist Opened

Analytics implementation should be privacy-friendly.

---

# Future Roadmap

Architecture should allow implementation of:

Gift contributions

Split expensive gifts between multiple guests

Thank-you page

Photo gallery after birth

Guestbook

Email notifications

Telegram reminders

Reservation expiration reminders

Push notifications

Search

Filters

Sorting

Multiple wishlists

Family accounts

PWA

Offline support

QR code for sharing

Printable wishlist

Gift recommendations

Gift priority scoring

Themes

Dark mode

Light mode

Custom domains

Custom branding

Multi-language support

Image compression pipeline

Webhook integrations

Baby Registry import/export

Gift contribution tracking

Photo memories linked to gifts

Birthday wishlist mode

QR-code invitation page

Guest RSVP

Theme customization

Multi-family support

---

# Documentation

Provide README.md including

Project overview

Tech stack

Folder structure

Environment variables

Running locally

Supabase setup

Storage setup

Authentication setup

Telegram bot setup

Database migrations

Deploying to Vercel

Common troubleshooting

Future improvements

---

# Acceptance Criteria

The final application should:

✓ Feel like a premium product.

✓ Load in under 2 seconds.

✓ Work perfectly on mobile.

✓ Be fully responsive.

✓ Support anonymous reservations.

✓ Update all clients in realtime.

✓ Send Telegram notifications.

✓ Include a secure admin panel.

✓ Use Supabase as backend.

✓ Be deployable to Vercel without additional changes.

✓ Follow modern Next.js 15 best practices.

✓ Be fully typed.

✓ Be production-ready.

✓ Be easy to extend.

The end result should feel closer to a polished SaaS application than a simple wishlist website.

# AI Development Instructions

You are acting as a Senior Full Stack Engineer.

Your responsibilities include:

Product Architect

UX Engineer

Backend Engineer

Frontend Engineer

Database Engineer

DevOps Engineer

Your goal is not to generate demo code.

Your goal is to produce production-ready software.

Always prefer quality over speed.

Never generate placeholder architecture.

Never generate fake implementations.

If something is unknown, create a reasonable implementation.

Do not leave TODOs unless explicitly requested.

---

# Coding Principles

Write code as if it will be maintained for years.

Every file should have one responsibility.

Avoid giant files.

Prefer many small reusable components.

Every exported function should have a clear purpose.

Never duplicate business logic.

If logic appears twice,
extract it.

---

# React Principles

Prefer Server Components.

Only use Client Components when interaction requires them.

Never mark an entire page as "use client"
unless absolutely necessary.

Move interactivity into isolated client components.

---

# TypeScript

Strict mode enabled.

Never use:

any

unknown (unless justified)

ts-ignore

Prefer explicit types.

Infer types only when obvious.

Export reusable types.

Never duplicate interfaces.

---

# Styling

TailwindCSS only.

No inline styles.

No CSS modules.

No styled-components.

No Emotion.

Create reusable utility components.

Spacing must follow an 8-point grid.

---

# Components

Every component should be:

Reusable

Accessible

Composable

Small

Testable

Never exceed roughly 200 lines unless justified.

Split logic into hooks when appropriate.

---

# Naming

Good examples

ProductCard

ReservationModal

WishlistGrid

HeroSection

CountdownTimer

Bad examples

Card2

Helper

Utils

Data

TestComponent

Names should describe purpose.

---

# Imports

Use absolute imports.

Avoid long relative paths.

Organize imports.

External

Internal

Relative

Alphabetically.

---

# Error Handling

Never ignore errors.

Every async function must handle failures.

Always return meaningful error messages.

Never expose internal stack traces.

---

# Logging

Development

Detailed logs allowed.

Production

Only meaningful logs.

No console.log left in production.

---

# Forms

React Hook Form

-

Zod

Every field validated.

Client validation

Server validation

Same schema shared.

---

# Database Access

Use Supabase client abstraction.

Never scatter SQL across the codebase.

Encapsulate database access.

Business logic should not know SQL.

---

# Realtime

All realtime subscriptions should be isolated.

Automatically unsubscribe.

Avoid memory leaks.

Reconnect automatically.

---

# Images

Use Next/Image.

Never use img tags.

Generate responsive sizes.

Use blur placeholders.

---

# Accessibility

Every button

aria-label

Every modal

Focus trap

ESC closes modal.

Tab navigation works.

Inputs have labels.

---

# Performance

Avoid unnecessary renders.

Use memoization only when justified.

Avoid premature optimization.

Prefer Server Components over client fetching.

Lazy load heavy components.

---

# Security

Never trust client data.

Validate everything.

Escape user input.

Protect secrets.

Never expose service keys.

Use server-only code when needed.

---

# Database Migrations

All schema changes must be generated as migrations.

Never require manual SQL.

Migrations should be idempotent.

---

# Git

Use conventional commits.

Examples

feat:

fix:

refactor:

docs:

test:

chore:

---

# Documentation

Document

Architecture

Important decisions

Environment variables

Database schema

Setup process

Deployment

---

# Code Reviews

Before considering implementation complete,
verify:

No duplicated logic

No dead code

No unnecessary client components

No unused imports

No console logs

No TypeScript errors

No ESLint warnings

No accessibility issues

No obvious performance issues

---

# UI Quality Checklist

Spacing consistent

Typography consistent

Animations smooth

Loading states implemented

Empty states implemented

Error states implemented

Hover states implemented

Focus states implemented

Mobile responsive

Desktop responsive

Tablet responsive

Dark mode compatible

---

# Backend Checklist

RLS enabled

Indexes added

Foreign keys configured

Cascade rules reviewed

Transactions used where necessary

Validation implemented

Realtime events working

Telegram notifications working

---

# Final Verification

Before considering the project complete:

Run lint.

Run typecheck.

Run tests.

Build production bundle.

Verify Lighthouse.

Verify mobile layout.

Verify admin authentication.

Verify reservation flow.

Verify realtime updates.

Verify Telegram notifications.

Verify deployment configuration.

Only then consider the implementation complete.

# AI Execution Plan

Do NOT generate the entire application in a single step.

Instead, work incrementally.

Each stage must be completed, reviewed and stabilized before moving to the next one.

Never skip stages.

Never leave partially implemented features.

Every stage should compile successfully.

Every stage should pass type checking.

Every stage should be committed independently.

---

# Stage 1

Project Bootstrap

Tasks

Initialize Next.js 15

Configure TypeScript

Configure TailwindCSS

Configure shadcn/ui

Configure ESLint

Configure Prettier

Configure Husky

Configure lint-staged

Configure absolute imports

Configure fonts

Configure environment variables

Configure project aliases

Configure dark mode support

Configure Vercel Analytics

Configure Speed Insights

Expected result

Project builds successfully.

---

# Stage 2

Supabase

Tasks

Create database schema

Create migrations

Configure Supabase client

Configure server client

Configure middleware

Configure authentication

Configure Storage

Enable Row Level Security

Create policies

Configure Realtime

Seed demo data

Expected result

Database completely operational.

---

# Stage 3

Shared Infrastructure

Tasks

Shared UI

Typography

Buttons

Inputs

Cards

Modals

Badges

Toast

Loading

Skeleton

Utilities

Validation

Helpers

Icons

Theme

Expected result

Reusable design system completed.

---

# Stage 4

Landing Page

Tasks

Navigation

Hero

About

Countdown

Statistics

Footer

Animations

Responsive layout

SEO

Expected result

Landing page completed.

---

# Stage 5

Wishlist

Tasks

Categories

Cards

Product Modal

Gallery

Marketplace links

Responsive grid

Realtime updates

Status badges

Expected result

Wishlist completed.

---

# Stage 6

Reservation System

Tasks

Reservation modal

Validation

API

Database

Realtime

Telegram

Loading states

Error states

Reservation expiration

Expected result

Complete reservation workflow.

---

# Stage 7

Admin Panel

Tasks

Dashboard

CRUD Products

CRUD Categories

Reservations

Media Library

Settings

Audit Log

Authentication

Permissions

Expected result

Fully functional admin panel.

---

# Stage 8

Polish

Tasks

Accessibility

Performance

Animations

Skeletons

Empty states

Error states

SEO

Metadata

Structured Data

Expected result

Production-quality UX.

---

# Stage 9

Testing

Tasks

Unit Tests

Integration Tests

API Tests

Reservation Flow

Realtime

Authentication

Expected result

Core functionality covered by tests.

---

# Stage 10

Deployment

Tasks

Production build

Environment variables

Vercel deployment

README

Deployment guide

Verification

Expected result

Website is deployable immediately.

---

# Development Rules

Never continue if the previous stage has build errors.

Never continue if TypeScript has errors.

Never continue if ESLint fails.

Never continue if tests fail.

Every stage should end with a clean git state.

---

# Git Strategy

Create commits after every completed feature.

Example

feat: bootstrap project

feat: configure supabase

feat: implement wishlist

feat: add reservation flow

feat: build admin dashboard

fix: reservation race condition

refactor: optimize product queries

docs: deployment guide

---

# Pull Request Checklist

Before considering work complete verify:

✓ TypeScript passes

✓ ESLint passes

✓ Build succeeds

✓ Lighthouse >95

✓ Mobile layout verified

✓ Desktop layout verified

✓ Tablet layout verified

✓ All images optimized

✓ Realtime works

✓ Telegram notifications work

✓ Reservation expiration works

✓ Admin authentication works

✓ No console logs

✓ No TODO comments

✓ No dead code

✓ README updated

---

# Final Deliverable

The final output must include:

Production-ready source code

Database migrations

Supabase configuration

Storage configuration

Telegram integration

Admin panel

Public website

Realtime updates

Reservation system

Responsive UI

Deployment configuration

README

Architecture documentation

Folder structure documentation

Environment variable documentation

Future roadmap

The final application should be indistinguishable from a professionally developed commercial product.

Code quality should meet Senior Full Stack Engineer standards.

Do not simplify the implementation unless explicitly instructed.

---

# Definition of Done

A feature is considered complete only if all of the following are true.

Functionality

✓ Business requirements implemented

✓ Edge cases handled

✓ Validation completed

✓ Error handling implemented

Quality

✓ TypeScript passes

✓ ESLint passes

✓ Production build succeeds

✓ No dead code

✓ No TODO comments

✓ No console.log

UI

✓ Mobile verified

✓ Tablet verified

✓ Desktop verified

✓ Loading states

✓ Empty states

✓ Error states

✓ Accessibility verified

Backend

✓ Database migration created

✓ RLS policy updated if required

✓ API validated

✓ Realtime verified

✓ Telegram notifications verified

Documentation

✓ README updated

✓ Environment variables documented

✓ Architecture updated if necessary

Only after every item above is satisfied may the feature be considered complete.

---

# Design DNA

This project is not about buying products.

It is about sharing one of the happiest moments in our lives.

Every design decision should reinforce this feeling.

The interface should create warmth, trust and calm.

Users should feel like they are visiting the website of close friends.

Never create an interface that resembles:

Amazon

Wildberries

Ozon

AliExpress

Corporate dashboards

Bootstrap templates

Material Design examples

Generic admin themes

The website should feel handcrafted.

---

# Emotional Goals

The visitor should feel:

Welcome

Calm

Comfortable

Happy

Trusted

Included

Every interaction should feel human.

Never cold.

Never corporate.

Never overly playful.

---

# Visual References

Reference products

Apple

Airbnb

Raycast

Linear

Stripe

Notion

Framer

Pinterest Editorial

Scandinavian Interior Design

Muuto

Audo Copenhagen

The design language should borrow from premium lifestyle brands rather than ecommerce websites.

---

# Photography

Use authentic photography.

Natural light.

Warm colors.

Minimal interiors.

Wood.

Linen.

Cotton.

Plants.

Soft shadows.

Avoid

Stock-looking smiling families

Artificial studio lighting

Bright saturated colors

Busy backgrounds

Heavy editing

Photos should feel timeless.

---

# White Space

Whitespace is a feature.

Do not try to fill every area.

Large margins.

Comfortable spacing.

Readable typography.

Content should breathe.

---

# Motion

Motion should communicate quality.

Never entertain.

Every animation must have purpose.

Use

Fade

Subtle scale

Opacity

Small vertical movement

Natural easing

Animation duration

200–500 ms

Never use

Bounce

Elastic

Spin

Flash

Shake

Confetti

Particle explosions

---

# Buttons

Buttons should feel tactile.

Rounded.

Soft.

Elegant.

Hover

Small lift

Slight shadow

Scale 1.02

Pressed

Scale 0.98

Loading

Spinner

Disabled

Muted

Never flashy.

---

# Cards

Cards should feel like printed paper placed on a table.

Rounded corners.

Soft borders.

Almost invisible shadows.

Generous padding.

Large product image.

Readable typography.

---

# Typography

Typography is one of the main design elements.

Headings should feel elegant.

Body text should be easy to read.

Avoid excessive bold text.

Avoid ALL CAPS.

Use font size hierarchy instead.

---

# Icons

Use icons only where they improve comprehension.

Avoid decorative icon overload.

Prefer outline icons.

Keep consistent stroke width.

---

# Colors

Colors should feel natural.

Muted.

Warm.

Comfortable.

Avoid highly saturated colors.

Success should not be neon green.

Danger should not be bright red.

Everything should remain soft.

---

# Mobile Experience

Design mobile-first.

The website will mostly be opened from messaging apps.

Everything should work perfectly with one thumb.

Large touch targets.

Readable text.

Fast loading.

No horizontal scrolling.

---

# Microinteractions

Every important interaction should provide feedback.

Examples

Image hover

Button press

Reservation success

Realtime update

Product becomes reserved

Admin confirmation

Feedback should be immediate.

---

# Empty States

Never show blank pages.

Every empty state should include

Illustration

Friendly copy

Suggested action

Example

"Пока здесь пусто, но совсем скоро появятся новые подарки ❤️"

---

# Loading States

Skeletons should match the final layout.

Avoid generic spinners where possible.

Prefer progressive loading.

Images should fade in gracefully.

---

# Error States

Errors should feel polite.

Example

"Что-то пошло не так.

Попробуйте ещё раз через несколько секунд."

Never blame the user.

Never expose technical details.

---

# Copywriting

Tone of voice

Warm

Honest

Minimal

Personal

Short sentences.

No marketing language.

No sales language.

No urgency.

No manipulation.

Avoid phrases like

"Hurry!"

"Limited offer!"

"Buy now!"

"Only today!"

This is a family website.

---

# Product Descriptions

Descriptions should explain why the product was chosen.

Not its specifications.

Example

"Эту коляску мы выбрали за её удобство, небольшой вес и хорошие отзывы родителей."

Instead of

"Вес 7.8 кг.

Колеса EVA.

Рама алюминий."

---

# Reservation Experience

The visitor should feel like they are helping.

Not purchasing.

The action is

"I'd like to gift this."

Not

"I am buying."

The wording should reflect generosity.

---

# Overall Feeling

Imagine that Apple designed a website for announcing the birth of a child.

The product should feel:

Elegant.

Warm.

Minimal.

Timeless.

Human.

If any UI element feels generic, remove it.

If any animation feels excessive, simplify it.

If any text sounds like marketing, rewrite it.

If in doubt,

choose simplicity.
