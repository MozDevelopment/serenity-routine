Current App Features:

Daily Mood and Energy Tracking: Track daily mood and energy levels with visual scales and detailed descriptions.

Activity Tracking: Log key daily routines and activities.

Notes Recording: Add personal notes related to mood and activities.

Admin Dashboard: Visualize mood and energy trends, generate weekly and monthly reports with PDF export.

Internationalization Support: Available in English and Portuguese.

Progressive Web App (PWA): Offline functionality and installability.

Project Requirements:

"Create a Social Rhythm Therapy (SRT) Mood Tracker application using Next.js14, shadcn/ui, Tailwind CSS, and TypeScript. Include features for daily mood and energy tracking, activity logging, and notes recording. Implement an admin dashboard with data visualization and report generation. Add internationalization support and make it a full-featured Progressive Web App."

Additional Features:

Mood and Energy Tracker:

Add emojis, descriptions, and labels for each value.

Include color gradients to illustrate selected values.

Header:

Display a motivational quote, current time and date, and the day count of the year.

Mood Thermometer Labels:

+5: really high, most manic, hospitalized

+4: mania getting out of control

+3: others notice that you’re hyper, talking fast

+2: revved up, better than “normal” mood

+1: little bit upbeat

0: even or level mood

-1: little bit down

-2: sad, low interest

-3: others notice that you’re down

-4: depression makes it hard to function

-5: really low, most depressed, possibly hospitalized

Energy Thermometer Labels:

+5: superhuman energy levels

+4: moving fast, can’t sit still

+3: others notice I am restless, excitable

+2: revved up, energized

+1: little bit hyper

0: even or level energy

-1: little bit sluggish

-2: takes effort to do things

-3: others notice I am moving or speaking slowly

-4: takes effort to do tiny things

-5: can barely move, in bed all day

Admin Area:

Show a dashboard with all metrics.

Use react-chartjs-2 for data visualization.

Allow weekly and monthly reports to be downloaded as PDF.

Enhanced Features:

User Authentication and Role-Based Access:

Implement secure authentication for patients and therapists using JWT.

Create separate dashboards for patients and therapists with appropriate access controls.

Medication Tracking:

Add features to log medications, including name, dosage, frequency, and time taken.

Implement reminders for medication intake.

Allow patients to note any side effects or mood changes related to medication.

Enhanced Notification System:

Develop customizable notifications for mood tracking, activity logging, and medication reminders.

Include snooze features and support for push and in-app notifications.

Onboarding Process:

Create an onboarding flow for new users to set up preferences.

Allow users to select notification frequency and times.

Guide users through initial setup of tracked activities and medications.

Goal Setting and Progress Tracking:

Implement features for users to set personal goals related to mood, energy levels, and activities.

Create visual representations of progress over time.

Allow therapists to view and comment on patient goals and progress.

Data Export:

Develop functionality for users to export data in formats such as CSV, JSON, and PDF.

Ensure data includes mood logs, energy levels, activities, medications, and goals.

Implement security measures to protect sensitive data during export.

Therapist Features:

Create dashboards for therapists to monitor patient progress.

Implement features for therapists to set tasks or goals for patients.

Allow therapists to send in-app messages or notifications to patients.

Improve the UI, UX and Anmation

Visuals and Soundscapes: Use imagery and soundscapes from nature to evoke peace and escapism.

User Interface: Gentle on the eyes with soft gradients and minimal visual clutter.

Illustrations: Bright, friendly colors with rounded cartoon-style illustrations.

Add animations, make the color palette variate based on the temperature of the day.

Development Guidelines:

Code Quality:

Use TypeScript strictly.

Follow ESLint rules.

Write unit tests for critical functions.

Document complex logic.

Component Structure:

Use functional components.

Implement proper prop typing.

Follow the single responsibility principle.

State Management:

Use Context for global state.

Handle loading/error states.

Maintain data consistency.

Performance:

Implement memoization.

Optimize re-renders.

Lazy load components.

Security:

Sanitize user input.

Secure local storage usage.

Handle sensitive data properly.

Analytics:

Track user engagement metrics, feature usage statistics, and error occurrence rates.
