const mongoose = require('mongoose')

const lectureSchema = new mongoose.Schema({

    lectureTitle: {
        type: String,
        required: true,
    },

    videoUrl: { type: String },
    publicId: { type: String },
    isPreviewFree: { type: Boolean },

}, { timestamps: true, versionKey: false })

// Virtual to display either creation or update date based on change
lectureSchema.virtual("displayDate").get(function () {
    const isUpdated = this.updatedAt.getTime() !== this.createdAt.getTime();
    const dateToFormat = isUpdated ? this.updatedAt : this.createdAt;

    return dateToFormat.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
});


// Virtual to display either creation or update time based on change
lectureSchema.virtual("displayTime").get(function () {
    const isUpdated = this.updatedAt.getTime() !== this.createdAt.getTime();
    const timeToFormat = isUpdated ? this.updatedAt : this.createdAt;

    return timeToFormat.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true // 12-hour format (AM/PM)
    });
});



const lectureModels = mongoose.model("lecture", lectureSchema);
module.exports = lectureModels;




