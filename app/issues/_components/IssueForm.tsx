"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Callout,
  DropdownMenu,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormType = {
  title: string;
  description: string;
  id: number;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
};

const IssueForm = ({ props }: { props?: IssueFormType }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set default status based on props, default to "OPEN" if no props
  const [status, setStatus] = useState<IssueFormType["status"]>(
    props?.status || "OPEN"
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IssueFormType>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      status: props?.status || "OPEN",
    },
  });

  const router = useRouter();
  const [error, setError] = useState("");

  const handleStatusChange = (newStatus: IssueFormType["status"]) => {
    setStatus(newStatus);
    setValue("status", newStatus); // Manually set the value in the form
  };

  return (
    <div className="max-w-3xl space-y-3">
      {error && (
        <Callout.Root>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onFocus={() => setError("")}
        className="space-y-2"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            console.log(data);

            if (props) {
              await axios.patch("/api/issues/" + props.id, data);
            } else {
              await axios.post("/api/issues", data);
            }

            router.push("/issues");
            router.refresh();
          } catch (error) {
            setIsSubmitting(false);
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          defaultValue={props?.title}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={props?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        {/* Dropdown for Status */}
        {props && (
          <div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="soft" size="4">
                  {status === "OPEN"
                    ? "Open"
                    : status === "IN_PROGRESS"
                    ? "In Progress"
                    : "Closed"}
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item
                  onSelect={() => handleStatusChange("OPEN")}
                  color="red"
                >
                  Open
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => handleStatusChange("IN_PROGRESS")}
                  color="orange"
                >
                  In Progress
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => handleStatusChange("CLOSED")}
                  color="green"
                >
                  Closed
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            <ErrorMessage>{errors.status?.message}</ErrorMessage>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            style={{ cursor: "pointer" }}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting && <Spinner />}{" "}
            {props ? "Update Issue" : "Create New Issue"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
