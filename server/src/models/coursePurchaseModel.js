const mongoose = require('mongoose')

const coursePurchaseSchema = new mongoose.Schema({

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    
    paymentId: {
        type: String,
        required: true
    }

}, { timestamps: true, versionKey: false })

// Virtual to display either creation or update date based on change
coursePurchaseSchema.virtual("displayDate").get(function () {
    const isUpdated = this.updatedAt.getTime() !== this.createdAt.getTime();
    const dateToFormat = isUpdated ? this.updatedAt : this.createdAt;

    return dateToFormat.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
});


// Virtual to display either creation or update time based on change
coursePurchaseSchema.virtual("displayTime").get(function () {
    const isUpdated = this.updatedAt.getTime() !== this.createdAt.getTime();
    const timeToFormat = isUpdated ? this.updatedAt : this.createdAt;

    return timeToFormat.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true // 12-hour format (AM/PM)
    });
});



const coursePurchaseModels = mongoose.model("coursepurchase", coursePurchaseSchema);
module.exports = coursePurchaseModels;






