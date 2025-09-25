const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({

    courseTitle: { type: String, required: true },
    courseSubtitle: { type: String },
    description: { type: String },
    category: { type: String, required: true },
    courseLevel: {
        type: String,
        enum: ['Beginner', 'Medium', 'Advanced']
    },
    coursePrice: {
        type: Number
    },
    courseThumbnail: {
        type: String
    },
    enrolledStudent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'  // one course can enrolled many user
        }
    ],

    allLectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lecture" // one course have many lectures
        }
    ],
    creator: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],

    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true, versionKey: false })

// Virtual to display either creation or update date based on change
courseSchema.virtual("displayDate").get(function () {
    const isUpdated = this.updatedAt.getTime() !== this.createdAt.getTime();
    const dateToFormat = isUpdated ? this.updatedAt : this.createdAt;

    return dateToFormat.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    
});


// Virtual to display either creation or update time based on change
courseSchema.virtual("displayTime").get(function () {
    const isUpdated = this.updatedAt.getTime() !== this.createdAt.getTime();
    const timeToFormat = isUpdated ? this.updatedAt : this.createdAt;

    return timeToFormat.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true // 12-hour format (AM/PM)
    });
});



const courseModels = mongoose.model("course", courseSchema);
module.exports = courseModels;






