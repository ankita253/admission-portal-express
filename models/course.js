const mongoose = require("mongoose");

const Courseschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        education: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,

        },

        status: {
            type: String,
            default: "pending",

        },

        comment: {
            type: String,
            default: "pending",

        }
    },
    { timestamps: true }
);
const CourseModel = mongoose.model("course", Courseschema);

module.exports = CourseModel;