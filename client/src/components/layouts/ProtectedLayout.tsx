import { Outlet, useLoaderData } from "react-router-dom";

export default function ProtectedLayout() {
    const { user } = useLoaderData() as { user: any };

    return (
        <div>
            {/* Optional: Add a navigation bar here */}
            <nav>
                <p>Logged in as: {user.name}</p>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
