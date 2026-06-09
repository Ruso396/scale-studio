"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import LeadImageUpload from "@/components/admin/LeadImageUpload";
import { leadSchema, type LeadFormData } from "@/lib/validations";
import { CITIES, SERVICES, BUDGETS, BHK_OPTIONS, LEAD_STATUSES } from "@/constants";
import { apiFetch, apiUpload } from "@/utils/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { PublicLead } from "@/types";

interface LeadFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editLead?: PublicLead & { clientName: string; phone: string };
}

export default function LeadFormModal({
  open,
  onClose,
  onSuccess,
  editLead,
}: LeadFormModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      status: "active",
    },
  });

  useEffect(() => {
    if (!open) return;

    setImageFile(null);
    setRemoveImage(false);

    if (editLead) {
      reset({
        clientName: editLead.clientName,
        phone: editLead.phone,
        city: editLead.city as LeadFormData["city"],
        service: editLead.service as LeadFormData["service"],
        budget: editLead.budget as LeadFormData["budget"],
        bhk: editLead.bhk as LeadFormData["bhk"],
        status: editLead.status,
      });
    } else {
      reset({
        clientName: "",
        phone: "",
        city: undefined,
        service: undefined,
        budget: undefined,
        bhk: undefined,
        status: "active",
      });
    }
  }, [editLead, reset, open]);

  const onSubmit = async (data: LeadFormData) => {
    try {
      let image: string | null | undefined;

      if (removeImage) {
        image = null;
      } else if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const uploadRes = await apiUpload<{ image: string }>(
          "/api/leads/upload",
          formData
        );
        image = uploadRes.data?.image;
      } else if (editLead?.image) {
        image = editLead.image;
      }

      const payload = {
        ...data,
        ...(image !== undefined ? { image } : {}),
      };

      if (editLead) {
        await apiFetch(`/api/leads/${editLead._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Lead updated successfully");
      } else {
        await apiFetch("/api/leads", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Lead created successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Operation failed");
    }
  };

  const formId = "lead-form-modal";

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title={editLead ? "Edit Lead" : "Add Lead"}
      description={
        editLead
          ? "Update lead details and image."
          : "Publish a verified lead to the platform."
      }
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={formId}
            loading={isSubmitting}
            className="w-full sm:w-auto"
          >
            {editLead ? "Save Changes" : "Add Lead"}
          </Button>
        </div>
      }
    >
      <form
        id={formId}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3.5"
      >
        <LeadImageUpload
          key={`${open}-${editLead?._id ?? "new"}`}
          compact
          existingImage={editLead?.image}
          onFileChange={(file) => {
            setImageFile(file);
            if (file) setRemoveImage(false);
          }}
          onRemove={() => setRemoveImage(true)}
          disabled={isSubmitting}
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Input
            label="Client Name"
            {...register("clientName")}
            error={errors.clientName?.message}
          />
          <Input
            label="Phone"
            {...register("phone")}
            error={errors.phone?.message}
            placeholder="10-digit mobile"
          />
          <Select
            label="City"
            options={CITIES}
            placeholder="Select city"
            {...register("city")}
            error={errors.city?.message}
          />
          <Select
            label="Service"
            options={SERVICES}
            placeholder="Select service"
            {...register("service")}
            error={errors.service?.message}
          />
          <Select
            label="Budget"
            options={BUDGETS}
            placeholder="Select budget"
            {...register("budget")}
            error={errors.budget?.message}
          />
          <Select
            label="BHK"
            options={BHK_OPTIONS}
            placeholder="Select BHK"
            {...register("bhk")}
            error={errors.bhk?.message}
          />
          <div className="md:col-span-2 md:max-w-[calc(50%-0.375rem)]">
            <Select
              label="Status"
              options={LEAD_STATUSES.map((s) => ({
                value: s,
                label: s.charAt(0).toUpperCase() + s.slice(1),
              }))}
              {...register("status")}
              error={errors.status?.message}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
