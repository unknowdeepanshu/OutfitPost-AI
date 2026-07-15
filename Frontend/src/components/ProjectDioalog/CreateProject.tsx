import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateProjectS } from "@/Store/projectCreate/projectSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CreateProject() {
  const dispatch = useDispatch();
  const [project, setProject] = useState(" ");
  const [Empty, setEmpty] = useState(false);
  const handleProject = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("this is project name", project);
    if (project === " " || project.trim().length === 0) {
      setEmpty(true);
      setTimeout(() => {
        setEmpty(false);
      }, 5000);
    } else {
      dispatch(CreateProjectS(project));
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleProject}>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Create a new project to generate AI-powered social media posters.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Project Name</Label>
              <Input
                id="name-1"
                name="name"
                value={project}
                placeholder="Enter project name"
                onChange={(e) => setProject(e.target.value)}
              />
            </Field>
            {Empty ? <AlertDestructive /> : null}
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={<Button variant="outline">Cancel</Button>}
              asChild
            />
            {!Empty ? (
              <Button type="submit">Create project</Button>
            ) : (
              <DialogClose>
                <Button type="submit">Create project</Button>
              </DialogClose>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Project Name Required</AlertTitle>
      <AlertDescription>
        This field is required. Please enter a valid project name before
        proceeding.
      </AlertDescription>
    </Alert>
  );
}
