import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IUnlockedLead extends Document {
  designerId: mongoose.Types.ObjectId;
  leadId: mongoose.Types.ObjectId;
  unlockedAt: Date;
}

const UnlockedLeadSchema = new Schema<IUnlockedLead>(
  {
    designerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    unlockedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

UnlockedLeadSchema.index({ designerId: 1, leadId: 1 }, { unique: true });

const UnlockedLead: Model<IUnlockedLead> =
  mongoose.models.UnlockedLead ??
  mongoose.model<IUnlockedLead>("UnlockedLead", UnlockedLeadSchema);

export default UnlockedLead;
