import React, { ReactNode } from "react";
import {
  FormProvider as Form,
  UseFormReturn,
  FieldValues
} from "react-hook-form";

interface FormProviderProps<T extends FieldValues = FieldValues> {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods
}: FormProviderProps<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
