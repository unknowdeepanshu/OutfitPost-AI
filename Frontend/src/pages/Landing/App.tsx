import { Link } from "react-router";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
function App() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Link to={"/dashboard"}>this is landing pages</Link>
        <header>
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton />
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </header>
      </div>
    </>
  );
}

export default App;
