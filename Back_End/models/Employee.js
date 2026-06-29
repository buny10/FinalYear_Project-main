const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
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
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    salary: {
      type: "Number",
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

// Automatically generate avatar initials
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