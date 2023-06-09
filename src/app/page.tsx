import Home from "@/components/Home";
import "@/styles/Home.scss";
import { QueryClient, QueryClientProvider } from "react-query";

export default async function HomePage() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Home />
        </QueryClientProvider>
    );
}
