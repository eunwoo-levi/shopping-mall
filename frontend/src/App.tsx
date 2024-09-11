import AppLayout from "./layout/AppLayout";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </>
  );
}
