import { Show, RedirectToSignIn } from "@clerk/react";

interface ProtectRoutes {
  Children: React.ReactElement;
}

function ProtectRoutes({ Children }: ProtectRoutes) {
  return (
    <>
      <Show when="signed-in">{Children}</Show>
      <Show when="signed-out">
        <RedirectToSignIn />
      </Show>
    </>
  );
}

export default ProtectRoutes;
