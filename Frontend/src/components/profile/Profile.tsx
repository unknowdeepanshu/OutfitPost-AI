import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser, UserAvatar } from "@clerk/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
export function Profile() {
  const [update, setUpdate] = useState(false);
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle>Account details</CardTitle>
      </CardHeader>
      {update ? (
        <Updateprofile show={setUpdate} />
      ) : (
        <ProfileDetails show={setUpdate} />
      )}{" "}
    </Card>
  );
}

interface Updates {
  show: (name: boolean) => void;
}

function Updateprofile({ show }: Updates) {
  const { register, handleSubmit } = useForm();
  const { user } = useUser();
  const updateProfile = async (data: any) => {
    console.log("data from", data);
    try {
      user?.update({
        firstName: data.FirstName,
        lastName: data.lastName,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(updateProfile)}
        className="flex flex-col gap-4"
      >
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <div className="flex flex-1 flex-col gap-4">
                <Label htmlFor="First name">First name</Label>
                <Input
                  type="text"
                  defaultValue={`${user?.firstName}`}
                  {...register("FirstName", { required: true })}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <Label htmlFor="email">Last name</Label>
                <Input
                  type="text"
                  defaultValue={`${user?.lastName}`}
                  {...register("LastName", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="mt-4 flex gap-2">
              <div className="flex flex-1 flex-col gap-4">
                <Label htmlFor="First name">Email</Label>
                <Input
                  type="Email"
                  defaultValue={`${user?.emailAddresses[0]?.emailAddress}`}
                  {...register("Email", { required: true })}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={() => show(false)}>
            Decline
          </Button>
          <Button type="submit">Accept</Button>
        </CardFooter>
      </form>
    </>
  );
}

function ProfileDetails({ show }: Updates) {
  const { user } = useUser();
  return (
    <>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <UserAvatar />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.fullName}</span>
              <span className="truncate text-xs">
                {user?.emailAddresses[0]?.emailAddress}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 justify-between text-left text-sm leading-tight">
              <span className="truncate font-medium">First name</span>
              <span className="truncate font-medium">{user?.firstName}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 justify-between text-left text-sm leading-tight">
              <span className="truncate font-medium">Last name</span>
              <span className="truncate font-medium">{user?.lastName}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 justify-between text-left text-sm leading-tight">
              <span className="truncate font-medium">Email</span>
              <span className="truncate font-medium">
                {user?.emailAddresses[0].emailAddress}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" onClick={() => show(true)}>
          Update
        </Button>
        <Button>Delete</Button>
      </CardFooter>
    </>
  );
}
