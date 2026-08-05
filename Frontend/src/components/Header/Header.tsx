import { useState } from "react";
import { Button } from "../ui/button";
import { IconMenu2Filled } from "@tabler/icons-react";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { DarkModeToggle } from "../Darkmode/Toggle";
import { Link } from "react-router";
function HeaderNav() {
  const [open, setOpen] = useState(false);
  const NavLink = [
    { NavText: "How It Works", url: "#" },
    { NavText: "Features", url: "#" },
    { NavText: "Templates", url: "#" },
    { NavText: "Pricing", url: "#" },
    { NavText: "FAQ", url: "#" },
  ];
  console.log(open);
  return (
    <>
      <header className="relative mt-2 flex max-h-1/12 items-center justify-between">
        <div className="flex h-full items-center gap-2">
          <img src="/OutfitPost_AI.png" className="h-full" alt="outfitpost" />
          <span className="font-sans font-bold">
            Oufit<span className="text-chart-2">Post Ai</span>
          </span>
        </div>

        <nav className="hidden h-full justify-center text-center lg:flex">
          <ul className="flex items-center justify-center gap-5">
            {NavLink.map((Nav, index) => (
              <li key={index}>
                <a href={Nav.url} className="relative">
                  {Nav.NavText}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex h-full items-center justify-center gap-2">
          <Show when="signed-out">
            <Button className="hidden rounded-none md:flex" variant="outline">
              <SignUpButton>Login</SignUpButton>
            </Button>
            <Button className="hidden rounded-none md:flex" variant="default">
              <SignInButton> Get started</SignInButton>
            </Button>
          </Show>
          <Show when="signed-in">
            <Button className="hidden rounded-none md:flex" variant="default">
              <Link to={"/dashboard"}> Get started</Link>
            </Button>
          </Show>

          <DarkModeToggle />
          <Button
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden"
            variant="ghost"
          >
            <IconMenu2Filled />
          </Button>
        </div>
        {open ? (
          <>
            <nav className="bg-background absolute inset-y-1/10 top-15 flex h-fit w-full flex-col justify-center gap-3 text-center lg:hidden">
              <ul className="flex flex-col items-center justify-center gap-5">
                {NavLink.map((Nav, index) => (
                  <li key={index}>
                    <a href={Nav.url}>{Nav.NavText}</a>
                  </li>
                ))}
              </ul>
              <div className="flex h-full flex-col items-center justify-center gap-4 md:hidden">
                <Show when="signed-out">
                  <Button className="rounded-none" variant="outline">
                    <SignUpButton>Login</SignUpButton>
                  </Button>
                  <Button className="rounded-none" variant="default">
                    <SignUpButton> Get started</SignUpButton>
                  </Button>
                  <Button
                    className="hidden rounded-none md:flex"
                    variant="default"
                  >
                    <SignInButton> Get started</SignInButton>
                  </Button>
                </Show>
                <Show when="signed-in">
                  <Button className="rounded-none" variant="default">
                    <Link to={"/dashboard"}> Get started</Link>
                  </Button>
                </Show>
              </div>
            </nav>
          </>
        ) : null}
        {/* <span className="absolute -bottom-2 h-px w-full bg-amber-50 opacity-25"></span> */}
      </header>
    </>
  );
}

export default HeaderNav;
