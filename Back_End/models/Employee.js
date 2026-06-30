const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    dept: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'On Leave', 'Inactive'],
      default: 'Active',
    },
    joined: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Email only needs to be unique PER USER, not globally —
// otherwise two different companies couldn't both have an
// employee named "john@company.com" even though they're unrelated.
employeeSchema.index({ userId: 1, email: 1 }, { unique: true });

employeeSchema.pre('save', function () {
  if (this.name && !this.avatar) {
    this.avatar = this.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
});

module.exports = mongoose.model('Employee', employeeSchema);