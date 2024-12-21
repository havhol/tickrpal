Middleware.ts

The Supabase middleware file focuses on session management and works as a reusable module.

This file is designed to create a server client and manage the Supabase session correctly.
Since it’s based on the official documentation, we should not change its core logic unless there’s a critical issue or a requirement that Supabase doesn’t handle out-of-the-box.
For example, it handles:
Creating a Supabase client.
Ensuring cookies are synchronized between the server and the client.
Avoiding premature session termination.