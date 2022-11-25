import { createRoot } from "react-dom/client";
import { MainView } from "./components/views/MainView";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<MainView />);
