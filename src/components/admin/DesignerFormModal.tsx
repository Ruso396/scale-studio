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

  const formId = "designer-form-modal";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      size="sm"
      title="Add Designer"
      description={`New designers receive ${SIGNUP_CREDITS} free credits and can log in immediately.`}
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={formId}
            variant="premium"
            loading={isSubmitting}
            className="w-full sm:w-auto"
          >
            Add Designer
          </Button>
        </div>
      }
    >
      <form
        id={formId}
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3.5 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <Input
            label="Full Name"
            {...register("name")}
            error={errors.name?.message}
            placeholder="Designer name"
          />
        </div>

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

        <div className="md:col-span-2">
          <Select
            label="City"
            options={CITIES}
            placeholder="Select city"
            {...register("city")}
            error={errors.city?.message}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
            placeholder="Min 6 characters"
          />
        </div>
      </form>
    </Modal>
  );
}
