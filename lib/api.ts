const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8000'; // 'process' is just like 'os' in Python.

/* Next.js allows the browser to safely read the variable while using the 'NEXT_PUBLIC_' prefix.
If it is omitted, it is hidden from the browser.
This is relevant when you use Next.js for the backend as well. */

const TOKEN_KEY = 'transit_access_token'; // Just a variable storing the key to use it for storing the JWT returned by the FastAPI backend in the localStorage later; just for a convenience.

export function saveAccessToken(token: string): void {
    // Use 'void if a function has nothing to return.

    /* In Python, we use 'None' if the function returns nothing; it literally returns the None object.
    Python is designed so that a function must always return something. Even if we don't manually return anything, Python quietly attaches a None object to it.

    In JavaScript at runtime, a function with no return statement produces 'undefined'.

    TypeScript introduces 'void' as a type for such functions, rather than just using undefined, for two key reasons:
        1. Value vs. Intent:
        If we typed a function as ': undefined', TypeScript would treat undefined as a mandatory return value and force us to literally type 'return undefined'; at the end of the function.
        ': void' instead states the intent: "This function is an action/procedure. It has no meaningful return value, so do not let anyone use its result."

        2. Callback Flexibility:
        ': void' allows callbacks (like '.forEach()' or click listeners) to do their work without caring if they accidentally return something. TypeScript simply ignores the return value and ensures the caller never depends on it.

    Why not remove undefined entirely?
        Because JavaScript existed for 17 years before TypeScript was invented. Millions of websites depend on JavaScript returning undefined. TypeScript cannot change how browsers execute JavaScript—it can only add safety rules on top of it. */

    if (typeof window !== 'undefined') { // typeof always return a string.
        // 'window' is a browser-only global. This condition ensures that saving the token in storage only runs in the browser, preventing server crashes.

        /* Next.js runs code in two places: the server (Node.js) and the browser.

        In regular React, Node.js is just a delivery-boy serving static files. But in Next.js, Node.js is an active server.

        Step 1: Node.js runs the React components on the server first and builds the complete HTML.
        Step 2: Node.js sends that HTML to the browser, but it ONLY ships JavaScript bundles for components tagged with 'use client'.
        Step 3 ('Hydration'): The browser receives that JavaScript and attaches interactivity (clicks, typing, state) to the HTML.

        Whereas in a regular React app, Node sends an empty HTML shell and forces the browser to build and execute everything from scratch in JavaScript. */

        localStorage.setItem(TOKEN_KEY, token);
    }
}

export function getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_KEY);
    }

    return null;
}

export function clearAccessToken(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
    }
}

export default async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = getAccessToken();
    const headers = new Headers(options.headers); // Headers is a global object; you don't have to import it from anywhere.

    if (options.body && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json'); // '.set' is a built-in method of Headers. Some others are '.has' and '.get'.
    }

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (response.status === 401) {
        clearAccessToken();

        throw new Error('Session got expired. Please log in again.');
    }

    if (!response.ok) {
        let errorMsg = `Request failed: ${response.status}`;

        try {
            const errorData = await response.json();

            if (errorData?.detail) {
                errorMsg = typeof errorData.detail === 'string'
                    ? errorData.detail
                    : JSON.stringify(errorData.detail);
            }
        }

        catch {
            // Ignore JSON parse errors
        }

        throw new Error(errorMsg);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}
