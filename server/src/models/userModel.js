const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    email: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['instructor', 'student'],
        default: student
    },

    enrolledCorses_courseId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: course // Course Model  
            //  one user can enrolled many course
        }
    ],

    photo: {
        publicId: { type: String },
        photoUrl: { type: String },
        photofileName: { type: String },
        default: ""
    },

}, { timestamps: true, versionKey: false })

// Virtual to display either creation or update date based on change
userSchema.virtual("displayDate").get(function () {
    const isUpdated = this.updatedAt.getTime() !== this.createdAt.getTime();
    const dateToFormat = isUpdated ? this.updatedAt : this.createdAt;

    return dateToFormat.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
});


// Virtual to display either creation or update time based on change
userSchema.virtual("displayTime").get(function () {
    const isUpdated = this.updatedAt.getTime() !== this.createdAt.getTime();
    const timeToFormat = isUpdated ? this.updatedAt : this.createdAt;

    return timeToFormat.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true // 12-hour format (AM/PM)
    });
});



const userModels = mongoose.model("user", userSchema);
module.exports = userModels;




// Add Virtual to Show "X time ago"

// taskSchema.virtual("timeAgo").get(function () {
//     const isUpdated = this.updatedAt.getTime() !== this.createdAt.getTime();
//     const dateToCompare = isUpdated ? this.updatedAt : this.createdAt;

//     const now = new Date();
//     const diffMs = now - dateToCompare;
//     const diffSec = Math.floor(diffMs / 1000);
//     const diffMin = Math.floor(diffSec / 60);
//     const diffHr = Math.floor(diffMin / 60);
//     const diffDays = Math.floor(diffHr / 24);

//     if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
//     if (diffHr > 0) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
//     if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
//     return "just now";
// });

//  AlterNate option using packages

// package Name ------> npm install date - fns



// const { formatDistanceToNow } = require('date-fns');

// taskSchema.virtual("timeAgo").get(function () {
//     const isUpdated = this.updatedAt.getTime() !== this.createdAt.getTime();
//     const dateToCompare = isUpdated ? this.updatedAt : this.createdAt;

//     return formatDistanceToNow(dateToCompare, { addSuffix: true });
// });