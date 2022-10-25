import mongoose from 'mongoose';

const essaySchema = mongoose.Schema(
    {
        heading: {
            type: String,
            required: true,
        },
        essaybody: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Essay = mongoose.model('Essay', essaySchema);

export default Essay;
