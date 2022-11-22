import { createRoot } from "react-dom/client";
import { MainView } from "./components/MainView";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<MainView />);
