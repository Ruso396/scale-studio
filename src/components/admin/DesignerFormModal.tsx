"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { CITIES, SIGNUP_CREDITS } from "@/constants";
import { apiFetch } from "@/utils/api";
import { toast } from "sonner";

interface DesignerFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DesignerFormModal({
  open,
  onClose,
  onSuccess,
}: DesignerFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await apiFetch("/api/admin/designers", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success(`Designer added with ${SIGNUP_CREDITS} free credits`);
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add designer");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add New Designer"
      className="max-w-lg"
    >
      <p className="mb-5 text-sm text-muted">
        Create a designer account. They will receive {SIGNUP_CREDITS} credits and can
        log in with the email and password you set.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          {...register("name")}
          error={errors.name?.message}
          placeholder="Designer name"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="email@example.com"
          />
          <Input
            label="Phone"
            {...register("phone")}
            error={errors.phone?.message}
            placeholder="10-digit mobile"
          />
        </div>

        <Select
          label="City"
          options={CITIES}
          placeholder="Select city"
          {...register("city")}
          error={errors.city?.message}
        />

        <Input
          label="Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
          placeholder="Min 6 characters"
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="premium" loading={isSubmitting}>
            Add Designer
          </Button>
        </div>
      </form>
    </Modal>
  );
}
